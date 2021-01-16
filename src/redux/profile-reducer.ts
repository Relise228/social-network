import {profileAPI} from '../api/api';
import {PostType, ProfileType} from "../types/types";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USE-PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const CLEAR_USER_PROFILE = 'profile/CLEAR_USER_PROFILE';
const DELETE_POST = 'profile/DELETE_POST';




let initialState = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 32},
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: '',
}

export type InitialStateType = typeof  initialState;

// @REDUCER

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter((p) => p.id != action.postId),
            };
        }

        default:
            return state;
    }
};

type AddPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type ClearUserProfileActionType = {
    type: typeof CLEAR_USER_PROFILE,
}
type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
// @ACTION CREATORS
export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText});

export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile,
});

export const clearUserProfile = (): ClearUserProfileActionType => ({
    type: CLEAR_USER_PROFILE,
});

export const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS,
    status,
});

// @THUNKS
export const setProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export default profileReducer;
