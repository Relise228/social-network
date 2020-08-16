import React, {useState, useEffect} from 'react';

const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div onDoubleClick={activateEditMode}>{props.status || '------'}</div>
      )}
      {editMode && (
        <div onBlur={deactivateEditMode}>
          <input onChange={onStatusChange} value={status} autoFocus={true} />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
