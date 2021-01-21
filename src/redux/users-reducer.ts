import {ResultCodesEnum} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";


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
        case "sn/users/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: true,
                }),
            };
        case "sn/users/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: false,
                }),
            };
        case "sn/users/SET_USERS":
            return {
                ...state,
                users: action.users,
            };
        case "sn/users/SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case "sn/users/SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };
        case "sn/users/TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case "sn/users/TOGGLE_FOLLOWING_PROGRESS":
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



type ActionsTypes = InferActionsTypes<typeof actions>



// @ACTION CREATORS
export const actions = {
    followSucces: (userId: number) => ({type: 'sn/users/FOLLOW', userId} as const),
    unFollowSuccess: (userId: number) => ({type: 'sn/users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'sn/users/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'sn/users/SET_CURRENT_PAGE', currentPage} as const),
    setUsersTotalCount: (totalUsersCount: number) => ({type: 'sn/users/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'sn/users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'sn/users/TOGGLE_FOLLOWING_PROGRESS', isFetching, userId} as const)
}





type ThunkType = BaseThunkType<ActionsTypes>
// @THUNKS
export const getUsers = (currentPage: number, pageSize: number): ThunkType =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        let response = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setUsersTotalCount(response.totalCount));
        dispatch(actions.toggleIsFetching(false));
    };

const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes
) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(
        dispatch,
        userId,
        usersAPI.follow.bind(usersAPI),
        actions.followSucces
    );
};

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(
        dispatch,
        userId,
        usersAPI.unFollow.bind(usersAPI),
        actions.unFollowSuccess
    );
};

export default usersReducer;
