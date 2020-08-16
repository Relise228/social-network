import React from 'react';
import styles from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.png';
import Loader from '../../Loader/Loader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapperProfile}>
      <div>
        <img
          className={styles.profileBg}
          src='https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'
          alt=''
        />
      </div>
      <div className='ava' className={styles.descriptionBlock}>
        <div>
          <img
            src={
              props.profile.photos.large !== null
                ? props.profile.photos.large
                : userPhoto
            }
            className={styles.userPhoto}
          />
        </div>
        <div className={styles.nameBlock}>
          <div>{props.profile.fullName}</div>
          <ProfileStatusWithHooks
            status={props.status}
            updateStatus={props.updateStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
