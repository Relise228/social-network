import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'b7860367-391c-45f1-b119-93fb166cfbad',
  },
});

export const usersAPI = {
  getUsers: (currentPage = 1, pageSize = 5) => {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow: (userId) => {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },
  unFollow: (userId) => {
    return instance
      .delete(`follow/${userId}`)
      .then((response) => response.data);
  },
};

export const authAPI = {
  getUserData: () => instance.get(`auth/me`).then((response) => response.data),
};

export const profileAPI = {
  getProfile: (userId) => {
    return instance.get(`profile/${userId}`).then((response) => {
      console.log(response.data);
      return response.data;
    });
  },
  getStatus: (userId) => {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus: (status) => {
    return instance
      .put(`profile/status`, {status})
      .then((response) => response.data);
  },
};
