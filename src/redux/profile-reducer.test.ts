import profileReducer, {profileActions} from './profile-reducer';

let state = {
  postsData: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: "It's my first post", likesCount: 32},
  ],
  newPostText: '',
  profile: null,
  status: '',
};

test('length of posts should be incremented', () => {
  //1. test data
  let action = profileActions.addPost('it-kamasutra.com');

  //2. action
  let newState = profileReducer(state, action);
  //expectation
  expect(newState.postsData.length).toBe(3);
  expect(newState.postsData[2].message).toBe('it-kamasutra.com');
});

test('message should be right', () => {
  //1. test data
  let action = profileActions.addPost('it-kamasutra.com');

  //2. action
  let newState = profileReducer(state, action);
  //expectation
  expect(newState.postsData[2].message).toBe('it-kamasutra.com');
});

test('after deleting length of messages should be decrement', () => {
  //1. test data
  let action = profileActions.deletePost(1);

  //2. action
  let newState = profileReducer(state, action);
  //expectation
  expect(newState.postsData.length).toBe(1);
});

test('after deleting length shoudnt be decrement if id is incorrect', () => {
  //1. test data
  let action = profileActions.deletePost(1000);

  //2. action
  let newState = profileReducer(state, action);
  //expectation
  expect(newState.postsData.length).toBe(2);
});
