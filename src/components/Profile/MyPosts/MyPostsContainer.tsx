import MyPosts from './MyPosts';
import {profileActions} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
    };
};

type MapStateToProps = ReturnType<typeof mapStateToProps>
type MapDispatchToProps = {
    addPost: (s: string) => void
}
const MyPostsContainer = connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {
    addPost: profileActions.addPost
})(MyPosts);

export default MyPostsContainer;
