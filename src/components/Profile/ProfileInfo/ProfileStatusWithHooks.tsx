import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (s: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = ({status, updateStatus}) => {
    const [editMode, setEditMode] = useState(false);
    const [statusHook, setStatusHook] = useState(status);

    useEffect(() => {
        setStatusHook(status);
    }, [status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        updateStatus(statusHook);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusHook(e.currentTarget.value);
    };

    return (
        <div>
            {!editMode && (
                <div onDoubleClick={activateEditMode}>{status || '------'}</div>
            )}
            {editMode && (
                <div onBlur={deactivateEditMode}>
                    <input onChange={onStatusChange} value={statusHook} autoFocus={true}/>
                </div>
            )}
        </div>
    );
};

export default ProfileStatusWithHooks;
