import {setUserData} from './auth-reducer';
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
  initialized: false,
}
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'sn/app/SET_INITIALIZED':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

// @ACTION CREATORS
type AppActionsType = InferActionsTypes<typeof appActions>

export const appActions = {
  initializingSuccess: () => ({type: 'sn/app/SET_INITIALIZED'} as const)
}


type ThunkType = BaseThunkType<AppActionsType>

// @THUNKS
export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(setUserData());
  dispatch(appActions.initializingSuccess());
};

export default appReducer;
