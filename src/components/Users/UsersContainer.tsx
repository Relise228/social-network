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
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type OwnPropsType = {}


type MapDispatchPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? (
                    <Loader/>
                ) : (
                    <Users follow={this.props.follow}
                           unFollow={this.props.unFollow}
                           currentPage={this.props.currentPage}
                           users={this.props.users}
                           totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           followingInProgress={this.props.followingInProgress}
                           onPageChanged={this.onPageChanged}/>
                )}
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage,
        getUsers,
    })
)(UsersContainer);
