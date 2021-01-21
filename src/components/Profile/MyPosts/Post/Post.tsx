import React from 'react';
import styles from './Post.module.css';


type PropsType = {
    message: string
    likesCount: number
}
const Post: React.FC<PropsType> = ({message, likesCount}) => {
    return (
        <div className={styles.item}>
            <img
                src='https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg'
                alt='ava'
            />
            {message}
            <div>
                <span>like</span>
                {likesCount}
            </div>
        </div>
    );
};

export default Post;
