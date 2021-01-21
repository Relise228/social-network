import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth-reducer';
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapStateToProps & MapDispatchToProps> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

type MapStateToProps = ReturnType<typeof mapStateToProps>
type MapDispatchToProps = {
  logout: () => void
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>
(mapStateToProps, {logout})(HeaderContainer);
