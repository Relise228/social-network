import React from 'react';
import styles from './users.module.css';
let Users = (props) => {
  if (props.users.length === 0) {
    debugger;
    props.setUsers([
      {
        id: 1,
        photoUrl:
          'https://roscongress.org/upload/resize_cache/iblock/f45/289_289_2/e3e9a63c93ad395edf9496497d5273fb_5bcb50678a4c08dde6f4b2697ecd4f24.jpg',
        fullName: 'Dmitry',
        status: 'I am a boss',
        location: {city: 'Minsk', country: 'Belarus'},
        followed: false,
      },
      {
        id: 2,
        photoUrl:
          'https://roscongress.org/upload/resize_cache/iblock/f45/289_289_2/e3e9a63c93ad395edf9496497d5273fb_5bcb50678a4c08dde6f4b2697ecd4f24.jpg',
        fullName: 'Sasha',
        status: 'I am a boss too',
        location: {city: 'Moscow', country: 'Russia'},
        followed: true,
      },
      {
        id: 3,
        photoUrl:
          'https://roscongress.org/upload/resize_cache/iblock/f45/289_289_2/e3e9a63c93ad395edf9496497d5273fb_5bcb50678a4c08dde6f4b2697ecd4f24.jpg',
        fullName: 'Andrew',
        status: 'I am a boss too',
        location: {city: 'Kiev', country: 'Ukraine'},
        followed: false,
      },
    ]);
  }

  return (
    <div>
      {props.users.map((user) => (
        <div key={user.id}>
          <span>
            <div>
              <img src={user.photoUrl} className={styles.userPhoto} />
            </div>
            <div>
              {user.followed ? (
                <button onClick={() => props.unFollow(user.id)}>
                  Unfollow
                </button>
              ) : (
                <button onClick={() => props.follow(user.id)}>Follow</button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{user.fullName}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{user.location.country}</div>
              <div>{user.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
