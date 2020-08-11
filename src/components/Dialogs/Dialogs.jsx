import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Field, reduxForm} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormsControls';
import {
  requiredField,
  maxLengthCreator,
} from '../../utils/validators/validators';

const Dialogs = (props) => {
  let state = props.dialogsPage;

  const addNewMassage = (values) => {
    props.sendMessage(values.newMessageBody);
    console.log(values);
  };

  const dialogsElements = state.dialogsData.map((data) => (
    <DialogItem name={data.name} id={data.id} key={data.id} />
  ));

  const messagesElements = state.messagesData.map((data) => (
    <Message message={data.message} key={data.id} />
  ));

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>{messagesElements}</div>
      <ReduxAddMassageForm onSubmit={addNewMassage} />
    </div>
  );
};

const maxLength100 = maxLengthCreator(50);
const AddMassageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name='newMessageBody'
          component={Textarea}
          placeholder='Enter your message'
          validate={[requiredField, maxLength100]}
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const ReduxAddMassageForm = reduxForm({form: 'dialogAddMassageForm'})(
  AddMassageForm
);

export default Dialogs;
