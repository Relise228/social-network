import React from 'react';
import styles from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
  return (
    <div>
      <div>
        <img
          className='profile-bg'
          src='https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'
          alt=''
        />
      </div>
      <div className='ava' className={styles.descriptionBlock}>
        <img
          src='https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg'
          alt=''
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
