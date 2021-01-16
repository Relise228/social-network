import React from 'react';
import styles from './users.module.css';
import User from './User';
import {useState} from 'react';
import {UserType} from "../../types/types";

type PropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (p: number) => void
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number,
}

let Users: React.FC<PropsType> = (props, portionSize = 10) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= 10; i++) {
        pages.push(i);
    }


    const follow = (userId: number): void => {
        props.follow(userId);
    };

    const unFollow = (userId: number): void => {
        props.unFollow(userId);
    };

    return (
        <div className={styles.usersWrapper}>
            <div className={styles.pagesPagination}>
                {pages
                    .map((p) => {
                        return (
                            <span
                                className={props.currentPage === p ? styles.selectedPage : ''}
                                onClick={(e) => {
                                    props.onPageChanged(p);
                                }}
                            >
                {p}
              </span>
                        );
                    })}
            </div>
            {props.users.map((user) => (
                <User
                    user={user}
                    key={user.id}
                    followingInProgress={props.followingInProgress}
                    follow={follow}
                    unFollow={unFollow}
                />
            ))}
        </div>
    );
};

export default Users;
