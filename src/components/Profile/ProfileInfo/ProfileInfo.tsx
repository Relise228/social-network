import React from 'react';
import styles from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.png';
import Loader from '../../Loader/Loader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string,
    updateStatus: (s: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Loader/>;
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
            <div className={'ava ' + styles.descriptionBlock}>
                <div>
                    <img
                        src={
                            profile.photos.large !== null ? profile.photos.large : userPhoto
                        }
                        className={styles.userPhoto}
                    />
                </div>
                <div className={styles.nameBlock}>
                    <div>{profile.fullName}</div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
