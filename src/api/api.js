import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'b7860367-391c-45f1-b119-93fb166cfbad',
  },
});

const usersAPI = {
  auth: {
    getUserData: () =>
      instance.get(`auth/me`).then((response) => response.data),
  },
  usersPage: {
    getUsers: (currentPage = 1, pageSize = 5) => {
      return instance
        .get(`users?page=${currentPage}&count=${pageSize}`)
        .then((response) => response.data);
    },
    follow: (userId) => {
      return instance
        .post(`follow/${userId}`)
        .then((response) => response.data);
    },
    unFollow: (userId) => {
      return instance
        .delete(`follow/${userId}`)
        .then((response) => response.data);
    },
  },
  profilePage: {
    getProfile: (userId) => {
      return instance
        .get(`profile/${userId}`)
        .then((response) => response.data);
    },
  },
};

export default usersAPI;
