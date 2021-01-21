import React from 'react';
import styles from './Message.module.css';

const Message: React.FC<{ message: string }> = ({message}) => {
    return <div className={styles.message}>{message}</div>;
};

export default Message;
