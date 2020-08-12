import {authAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        isAuth: action.payload.isAuth,
      };
    default:
      return state;
  }
};

// @ACTION CREATORS
export const setAuthUserData = (userId, login, email, isAuth) => ({
  type: SET_USER_DATA,
  payload: {userId, email, login, isAuth},
});

// @THUNKS
export const setUserData = () => (dispatch) => {
  return authAPI.getUserData().then((data) => {
    if (data.resultCode === 0) {
      let {id, login, email} = data.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
  });
};

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((data) => {
    console.log(data);
    if (data.resultCode == 0) {
      dispatch(setUserData());
    } else {
      let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
      dispatch(stopSubmit('login', {_error: message}));
    }
  });
};

export const logout = () => (dispatch) => {
  authAPI.logout().then((data) => {
    console.log(data);
    if (data.resultCode == 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
