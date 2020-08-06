import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {
  sendMessageCreator,
  updateMessageBodyCreator,
} from '../../redux/dialogs-reducer';

const Dialogs = (props) => {
  let state = props.store.getState().dialogsPage;

  const onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };
  const onMessageChange = (e) => {
    let text = e.target.value;
    props.store.dispatch(updateMessageBodyCreator(text));
  };

  const dialogsElements = state.dialogsData.map((data) => (
    <DialogItem name={data.name} id={data.id} />
  ));

  const messagesElements = state.messagesData.map((data) => (
    <Message message={data.message} />
  ));

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>
        {messagesElements}
        <div>
          <textarea
            value={props.newMessageBody}
            onChange={onMessageChange}
            placeholder='Enter your message'
          ></textarea>
        </div>
        <div>
          <button onClick={onSendMessageClick}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
