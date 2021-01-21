import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';

const DialogItem: React.FC<{ id: number, name: string }> = ({id, name}) => {
    const path = '/dialogs/' + id;

    return (
        <div className={styles.dialog + ' ' + styles.active}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    );
};

export default DialogItem;
