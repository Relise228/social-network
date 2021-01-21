import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfileType} from "../../types/types";


type PropsType = {
    profile: ProfileType | null,
    status: string
    updateStatus: (s: string) => void
}

const Profile: React.FC<PropsType> = ({profile, status, updateStatus}) => {
    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
            />
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;
