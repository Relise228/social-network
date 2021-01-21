import {ResultCodesEnum} from '../api/api';
import {FormAction, stopSubmit} from 'redux-form';
import {authAPI} from "../api/auth-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


let initialState = {
    userId: null as number | null,
    email: null as null | string,
    login: null as null | string,
    isFetching: false,
    isAuth: false,
};

type InitialStateType = typeof initialState;


const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'sn/auth/SET_USER_DATA':
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
type AuthActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: 'sn/auth/SET_USER_DATA',
        payload: {userId, email, login, isAuth},
    } as const)
}



// @THUNKS
export const setUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.getUserData();
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = data.data;
        dispatch(authActions.setAuthUserData(id, login, email, true));
    }
};

type ThunkType = BaseThunkType<AuthActionsType | FormAction>

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe);

    if (data.resultCode === ResultCodesEnum.Success) {
       await dispatch(setUserData());
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
};

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(authActions.setAuthUserData(null, null, null, false));
    }
};

export default authReducer;
