import React, {useEffect} from 'react';
import styles from './users.module.css';
import User from './User';
import {UserType} from "../../types/types";
import Paginator from "./Paginator/Paginator";
import {UsersSearchForm} from "./UsersSearchForm";
import {actions, FilterType, getUsers, follow, unFollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount, getUsersFilter,
    getUsersSuper
} from "../../redux/users-selectors";


type PropsType = {

}

const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsersSuper)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter));
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(getUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));
    }

    const onFollow = (userId: number): void => {
        dispatch(follow(userId));
    };

    const onUnFollow = (userId: number): void => {
        dispatch(unFollow(userId));
    };

    return (
        <div className={styles.usersWrapper}>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage} onPageChanged={onPageChanged}/>
            {users.map((user) => (
                <User
                    user={user}
                    key={user.id}
                    followingInProgress={followingInProgress}
                    follow={onFollow}
                    unFollow={onUnFollow}
                />
            ))}
        </div>
    );
};



export default Users;
