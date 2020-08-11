import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {reduxForm, Field} from 'redux-form';
import {requiredField, maxLength10} from '../../../utils/validators/validators';
import {Textarea} from '../../../common/FormsControls/FormsControls';

const MyPosts = (props) => {
  const postsElements = props.posts.map((data) => (
    <Post message={data.message} likesCount={data.likesCount} key={data.id} />
  ));

  const onAddPost = (values) => {
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
};

const PostsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name='newPostText'
          component={Textarea}
          placeholder='Enter your post text'
          validate={[requiredField, maxLength10]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const ReduxPostsForm = reduxForm({form: 'postsForm'})(PostsForm);

export default MyPosts;
