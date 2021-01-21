import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getStatus, profileActions, setProfile, updateStatus,} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {AppStateType} from "../../redux/redux-store";

type MatchParams = {
  userId: string
}
type ProfileContainerOwnProps = {

}

type PropsType = MapStateToProps & RouteComponentProps<MatchParams> & ProfileContainerOwnProps & MapDispatchToProps

class ProfileContainer extends React.Component<PropsType> {


  refreshProfile() {
    let userId: number | null = Number(this.props.match.params.userId);
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push('login');
      }
    }
    this.props.setProfile(userId as number);
    this.props.getStatus(userId as number);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: Readonly<{}>) {
    if(this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
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

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});


type MapDispatchToProps = {
  setProfile: (id: number) => void
  getStatus: (id: number) => void
  updateStatus: (s: string) => void
  clearUserProfile: () => void
}
type MapStateToProps = ReturnType<typeof mapStateToProps>

export default compose<React.ComponentType>(
  connect<MapStateToProps, MapDispatchToProps, ProfileContainerOwnProps, AppStateType>(mapStateToProps, {
    setProfile,
    getStatus,
    updateStatus,
    clearUserProfile: profileActions.clearUserProfile,
  }),
  withRouter
)(ProfileContainer);
