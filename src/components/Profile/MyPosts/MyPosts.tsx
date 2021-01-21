import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLength10, requiredField} from '../../../utils/validators/validators';
import {CreateField, GetStringKeys, Textarea} from '../../../common/FormsControls/FormsControls';
import {PostType} from "../../../types/types";


type PropsType = {
    posts: Array<PostType>
    addPost: (s: string) => void
}

const MyPosts = React.memo<PropsType>((props) => {
  console.log('componentDidUpdate');

  let postsElements = props.posts.reverse().map((data) => (
    <Post message={data.message} likesCount={data.likesCount} key={data.id} />
  ));

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <div>
        <ReduxPostsForm onSubmit={onAddPost} />
      </div>
      <div className={styles.posts}>{postsElements}</div>
    </div>
  );
});


type AddPostFormValuesType = {
    newPostText: string
}
type FieldPostKeys = GetStringKeys<AddPostFormValuesType>

type PostsFormType = {

}

const PostsForm: React.FC<InjectedFormProps<AddPostFormValuesType,PostsFormType> & PostsFormType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
          {CreateField<FieldPostKeys>('Enter your post text', 'newPostText',[requiredField, maxLength10], Textarea)}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const ReduxPostsForm = reduxForm<AddPostFormValuesType, PostsFormType>({form: 'postsForm'})(PostsForm);

export default MyPosts;
