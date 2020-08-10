import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Redirect} from 'react-router-dom';

const Dialogs = (props) => {
  let state = props.dialogsPage;

  const onSendMessageClick = () => {
    props.sendMessage();
  };

  const onMessageChange = (e) => {
    let text = e.target.value;
    props.undateNewMessageBody(text);
  };

  const dialogsElements = state.dialogsData.map((data) => (
    <DialogItem name={data.name} id={data.id} key={data.id} />
  ));

  const messagesElements = state.messagesData.map((data) => (
    <Message message={data.message} key={data.id} />
  ));

  if (!props.isAuth) return <Redirect to='/login' />;

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
