import {setUserData} from './auth-reducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializingSuccessActionType = {
  type: typeof SET_INITIALIZED
}

// @ACTION CREATORS
export const initializingSuccess = (): InitializingSuccessActionType => ({
  type: SET_INITIALIZED,
});

// @THUNKS
export const initializeApp = () => async (dispatch: Function) => {
  await dispatch(setUserData());
  dispatch(initializingSuccess());
};

export default appReducer;
