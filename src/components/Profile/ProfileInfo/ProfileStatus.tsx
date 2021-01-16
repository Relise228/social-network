import React, {ChangeEvent} from 'react';

type PropsType = {
  status: string
  updateStatus: (status: string) => void
}

type StateType = {
  editMode: boolean
  status: string
}


class ProfileStatus extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
  }

  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    console.log('this:', this);
    this.setState({editMode: true});
  };

  deactivateEditMode = () => {
    this.setState({editMode: false});
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({status: e.currentTarget.value});
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({status: this.props.status});
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div onDoubleClick={this.activateEditMode}>
            {this.props.status || '------'}
          </div>
        )}
        {this.state.editMode && (
          <div onBlur={this.deactivateEditMode}>
            <input
              onChange={this.onStatusChange}
              value={this.state.status}
              autoFocus={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
