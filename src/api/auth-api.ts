import {instance, ResponseType} from "./api";

type ProfileResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
   userId: number
}
export const authAPI = {
    getUserData: () => instance.get<ResponseType<ProfileResponseDataType>>(`auth/me`).then((response) => response.data),
    login: (email: string, password: string, rememberMe = false) =>
        instance
            .post<ResponseType<LoginResponseDataType>>(`auth/login`, {email, password, rememberMe})
            .then((response) => {
                return response.data;
            }),
    logout: () => instance.delete(`auth/login`).then((response) => response.data),
};
