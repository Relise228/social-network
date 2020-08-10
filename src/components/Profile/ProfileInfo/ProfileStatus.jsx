import React from 'react';

class ProfileStatus extends React.Component {
  constructor(props) {
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

  onStatusChange = (e) => {
    this.setState({status: e.currentTarget.value});
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({satus: this.props.status});
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
