import {authAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {setUserData} from './auth-reducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

// @ACTION CREATORS
export const initializingSuccess = () => ({
  type: SET_INITIALIZED,
});

// @THUNKS
export const initializeApp = () => async (dispatch) => {
  await dispatch(setUserData());
  dispatch(initializingSuccess());
};

export default appReducer;
