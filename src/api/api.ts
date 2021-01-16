import axios from 'axios';

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
  follow: (userId: number) => {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },
  unFollow: (userId: number) => {
    return instance
      .delete(`follow/${userId}`)
      .then((response) => response.data);
  },
};

type ProfileDataType = {
  id: number
  email: string
  login: string
}

export enum ResultCodesEnum  {
  Success = 0,
  Error = 1
}

type GetProfileType = {
  data: ProfileDataType
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: {userId: number}
  resultCode: ResultCodesEnum
  messages: Array<string>
}

export const authAPI = {
  getUserData: () => instance.get<GetProfileType>(`auth/me`).then((response) => response.data),
  login: (email: string, password: string, rememberMe = false) =>
    instance
      .post<LoginResponseType>(`auth/login`, {email, password, rememberMe})
      .then((response) => {
        return response.data;
      }),
  logout: () => instance.delete(`auth/login`).then((response) => response.data),
};



export const profileAPI = {
  getProfile: (userId: number) => {
    return instance.get(`profile/${userId}`).then((response) => {
      console.log(response.data);
      return response.data;
    });
  },
  getStatus: (userId: number) => {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus: (status: string) => {
    return instance
      .put(`profile/status`, {status})
      .then((response) => response.data);
  },
};
