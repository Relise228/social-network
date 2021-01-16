const SEND_MESSAGE = 'SEND-MESSAGE'

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

export const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
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

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE,
  newMessageBody: string
}

// @ACTION CREATORS
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
