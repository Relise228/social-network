const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  dialogsData: [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrey'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Sasha'},
    {id: 5, name: 'Viktor'},
    {id: 6, name: 'Valera'},
  ],
  messagesData: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How is it going?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Yo'},
    {id: 5, message: 'Yo'},
    {id: 6, message: 'Yo'},
  ],
};

export const dialogsReducer = (state = initialState, action) => {
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
      };
    default:
      return state;
  }
};

// @ACTION CREATORS
export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
