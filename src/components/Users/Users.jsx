import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from 'react-router-dom';

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= 10; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.usersWrapper}>
      <div className={styles.pagesPagination}>
        {pages.map((p) => {
          return (
            <span
              className={props.currentPage === p && styles.selectedPage}
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
        <div key={user.id} className={styles.wrapperUser}>
          <div className={styles.avatarButton}>
            <div>
              <NavLink to={'/profile/' + user.id}>
                <img
                  src={
                    user.photos.small !== null ? user.photos.small : userPhoto
                  }
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {user.followed ? (
                <button
                  onClick={() => props.unFollow(user.id)}
                  className={styles.unFollowedButton}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => props.follow(user.id)}
                  className={styles.followedButton}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className={styles.userInfo}>
            <div>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </div>
            <div>
              <div>Ukraine</div>
              <div>Kyiv</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
