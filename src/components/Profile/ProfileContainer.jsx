import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {
  setProfile,
  getStatus,
  updateStatus,
  clearUserProfile,
} from '../../redux/profile-reducer';
import {withRouter, Redirect} from 'react-router-dom';
import {compose} from 'redux';

class ProfileContainer extends React.Component {
  userId = this.props.match.params.userId;
  componentDidMount() {
    if (!this.userId) {
      this.userId = this.props.authorizedUserId;
      if (!this.userId) {
        this.props.history.push('login');
      }
    }
    this.props.setProfile(this.userId);
    this.props.getStatus(this.userId);
  }

  componentWillUnmount() {
    this.props.clearUserProfile();
  }

  render() {
    // if (!this.userId && this.props.isAuth === false)
    //   return <Redirect to='/login' />;

    return <Profile {...this.props} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {
    setProfile,
    getStatus,
    updateStatus,
    clearUserProfile,
  }),
  withRouter
)(ProfileContainer);
