import {InferActionsTypes} from "./redux-store";

type DialogType = {
  id: number,
  name: string
}
type MessagesType = {
  id: number,
  message: string
}


let initialState = {
  dialogsData: [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrey'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Sasha'},
    {id: 5, name: 'Viktor'},
    {id: 6, name: 'Valera'},
  ] as Array<DialogType>,
  messagesData: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How is it going?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Yo'},
    {id: 5, message: 'Yo'},
    {id: 6, message: 'Yo'},
  ] as Array<MessagesType>,
  newMessageBody: ''
}

export type InitialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action: DialogsActionsType): InitialStateType => {
  switch (action.type) {
    case 'sn/dialogs/SEND_MESSAGE':
      let body = action.newMessageBody;
      return {
        ...state,
        newMessageBody: '',
        messagesData: [
          ...state.messagesData,
          {
            id: state.messagesData.length + 1,
            message: body,
          },
        ],
      }
    default:
      return state;
  }
};

// @ACTION CREATORS
type DialogsActionsType = InferActionsTypes<typeof dialogsActions>

export const dialogsActions = {
  sendMessage: (newMessageBody: string) => ({
    type: 'sn/dialogs/SEND_MESSAGE',
    newMessageBody,
  })
}


export default dialogsReducer;
