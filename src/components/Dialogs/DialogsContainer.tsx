import React from 'react';
import {dialogsActions} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
    newMessageBody: state.dialogsPage.newMessageBody,
  };
};

type MapStateToProps = ReturnType<typeof mapStateToProps>
type MapDispatchToProps = {
  sendMessage: (s: string) => void
}


export default compose<React.ComponentType>(
    connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {
      sendMessage: dialogsActions.sendMessage
    }),
    withAuthRedirect
)(Dialogs);
