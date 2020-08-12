import {profileAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USE-PROFILE';
const SET_STATUS = 'SET_STATUS';
const CLEAR_USER_PROFILE = 'CLEAR_USER_PROFILE';

let initialState = {
  postsData: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: "It's my first post", likesCount: 32},
  ],
  newPostText: 'it',
  profile: null,
  status: '',
};

// @REDUCER

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsData: [
          ...state.postsData,
          {
            id: state.postsData.length + 1,
            message: action.newPostText,
            likesCount: 0,
          },
        ],
      };
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case CLEAR_USER_PROFILE: {
      return {
        ...state,
        profile: null,
      };
    }
    default:
      return state;
  }
};

// @ACTION CREATORS
export const addPost = (newPostText) => ({type: ADD_POST, newPostText});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const clearUserProfile = () => ({
  type: CLEAR_USER_PROFILE,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

// @THUNKS
export const setProfile = (userId) => (dispatch) => {
  profileAPI.getProfile(userId).then((data) => {
    dispatch(setUserProfile(data));
  });
};

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((data) => {
    dispatch(setStatus(data));
  });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};

export default profileReducer;
