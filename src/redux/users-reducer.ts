import {ResultCodesEnum, usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from "../types/types";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: true,
                }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: false,
                }),
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter((id) => id != action.userId)],
            };
        default:
            return state;
    }
};



type ActionsTypes = FollowSuccesActionType | UnFollowSuccessActionType | SetUsersActionType
    | SetCurrentPageActionType | SetUsersTotalCountActionType | ToggleIsFetchingActionType
    | ToggleFollowingProgressActionType

type FollowSuccesActionType = {
    type: typeof FOLLOW,
    userId: number
}
type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
}
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
type SetUsersTotalCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}


// @ACTION CREATORS
export const followSucces = (userId: number): FollowSuccesActionType => ({type: FOLLOW, userId});
export const unFollowSuccess = (userId: number): UnFollowSuccessActionType => ({type: UNFOLLOW, userId});
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});
export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
});
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId,
});


type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
// @THUNKS
export const getUsers = (currentPage: number, pageSize: number): ThunkType =>
    async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        let response = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setUsers(response.items));
        dispatch(setUsersTotalCount(response.totalCount));
        dispatch(toggleIsFetching(false));
    };

const _followUnfollowFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => FollowSuccesActionType | UnFollowSuccessActionType
) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(
        dispatch,
        userId,
        usersAPI.follow.bind(usersAPI),
        followSucces
    );
};

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(
        dispatch,
        userId,
        usersAPI.unFollow.bind(usersAPI),
        unFollowSuccess
    );
};

export default usersReducer;
