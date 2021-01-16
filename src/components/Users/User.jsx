import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from 'react-router-dom';

let User = ({user, followingInProgress, follow, unFollow}) => {
  return (
    <div key={user.id} className={styles.wrapperUser}>
      <div className={styles.avatarButton}>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => unFollow(user.id)}
              className={styles.unFollowedButton}
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => follow(user.id)}
              disabled={followingInProgress.some((id) => id === user.id)}
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
  );
};

export default User;
