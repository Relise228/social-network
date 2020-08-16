import React from 'react';
import {connect} from 'react-redux';
import {
  follow,
  unFollow,
  setCurrentPage,
  getUsers,
} from '../../redux/users-reducer';
import Users from './Users';
import Loader from '../Loader/Loader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {
  getPageSize,
  getAllUsers,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
  getUsersSuper,
} from '../../redux/users-selectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Loader />
        ) : (
          <Users {...this.props} onPageChanged={this.onPageChanged} />
        )}
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsersSuper(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => dispatch(followAC(userId)),
//     unFollow: (userId) => dispatch(unFollowAC(userId)),
//     setUsers: (users) => dispatch(setUsersAC(users)),
//     setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
//     setTotalUsersCount: (totalCount) =>
//       dispatch(setUsersTotalCountAC(totalCount)),
//     toggleIsFetching: (isFetching) => dispatch(toggleIsFetchingAC(isFetching)),
//   };
// };

export default compose(
  connect(mapStateToProps, {
    follow,
    unFollow,
    setCurrentPage,
    getUsers,
  })
)(UsersContainer);
