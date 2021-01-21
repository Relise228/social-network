import {PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {ResultCodesEnum} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


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

const profileReducer = (state = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'sn/profile/ADD_POST':
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
        case 'sn/profile/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile,
            };
        }
        case 'sn/profile/SET_STATUS': {
            return {
                ...state,
                status: action.status,
            };
        }
        case 'sn/profile/CLEAR_USER_PROFILE': {
            return {
                ...state,
                profile: null,
            };
        }
        case 'sn/profile/DELETE_POST': {
            return {
                ...state,
                postsData: state.postsData.filter((p) => p.id != action.postId),
            };
        }

        default:
            return state;
    }
};


// @ACTION CREATORS
type ProfileActionsType = InferActionsTypes<typeof profileActions>


export const profileActions = {
    addPost: (newPostText: string) => ({type: 'sn/profile/ADD_POST', newPostText} as const),
    deletePost: (postId: number) => ({type: 'sn/profile/DELETE_POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'sn/profile/SET_USER_PROFILE', profile} as const),
    clearUserProfile: () => ({type: 'sn/profile/CLEAR_USER_PROFILE'} as const),
    setStatus: (status: string) => ({type: 'sn/profile/SET_STATUS', status} as const)
}

type ThunkType = BaseThunkType<ProfileActionsType>

// @THUNKS
export const setProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUserProfile(response));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(profileActions.setStatus(response));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(profileActions.setStatus(status));
    }
};

export default profileReducer;
