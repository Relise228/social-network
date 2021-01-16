import {authAPI, ResultCodesEnum} from '../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';

// type InitialStateType = {
//     userId: null | number,
//     email: null | string,
//     login: null | string,
//     isFetching: boolean,
//     isAuth: boolean,
// };

let initialState = {
    userId: null as number | null,
    email: null as null | string,
    login: null as null | string,
    isFetching: false,
    isAuth: false,
};

type InitialStateType = typeof initialState;


const authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

// @ACTION CREATORS
export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth},
});

// @THUNKS
export const setUserData = () => async (dispatch: Function) => {
    let data = await authAPI.getUserData();

    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: Function) => {
    let data = await authAPI.login(email, password, rememberMe);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserData());
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
};

export const logout = () => async (dispatch: Function) => {
    let data = await authAPI.logout();
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;
