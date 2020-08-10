import React from 'react';
import {
  sendMessageCreator,
  updateMessageBodyCreator,
} from '../../redux/dialogs-reducer';
import Dialogs from '../Dialogs/Dialogs';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {withAuthRedirect} from '../../hoc/withAuthRedirect';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    newMessageBody: state.dialogsPage.newMessageBody,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    undateNewMessageBody: (text) => {
      dispatch(updateMessageBodyCreator(text));
    },
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
