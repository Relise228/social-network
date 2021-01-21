import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {CreateField, Textarea} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, requiredField,} from '../../utils/validators/validators';
import {InitialStateType} from "../../redux/dialogs-reducer";

type OwnPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (s: string) => void
}


const Dialogs: React.FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage;

    const addNewMassage = (values: { newMessageBody: string }) => {
        props.sendMessage(values.newMessageBody);
        console.log(values);
    };

    const dialogsElements = state.dialogsData.map((data) => (
        <DialogItem name={data.name} id={data.id} key={data.id}/>
    ));

    const messagesElements = state.messagesData.map((data) => (
        <Message message={data.message} key={data.id}/>
    ));

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>{dialogsElements}</div>
            <div className={styles.messages}>{messagesElements}</div>
            <ReduxAddMassageForm onSubmit={addNewMassage}/>
        </div>
    );
};


type NewMessageFormType = {
    newMessageBody: string
}
type MessageFormValuesTypeKeys = Extract<keyof NewMessageFormType, string>
type AddMessageFormPropsType = {}

const maxLength100 = maxLengthCreator(50);
const AddMassageForm: React.FC<InjectedFormProps<NewMessageFormType, AddMessageFormPropsType> & AddMessageFormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {CreateField<MessageFormValuesTypeKeys>('Enter your message', 'newMessageBody', [requiredField, maxLength100], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
};

const ReduxAddMassageForm = reduxForm<NewMessageFormType, AddMessageFormPropsType>({form: 'dialogAddMassageForm'})(
    AddMassageForm
);

export default Dialogs;
