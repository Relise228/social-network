const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

export const dialogsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.newText;
      return state;
    case SEND_MESSAGE:
      let body = {
        id: state.messagesData.length + 1,
        message: state.newMessageBody,
      };
      state.messagesData.push(body);
      return state;
    default:
      return state;
  }
};

export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export const updateMessageBodyCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  newText: text,
});

export default dialogsReducer;
