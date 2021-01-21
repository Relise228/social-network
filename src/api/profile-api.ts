import {instance, ResponseType} from "./api";
import {ProfileType} from "../types/types";

export const profileAPI = {
    getProfile: (userId: number) => {
        return instance.get<ProfileType>(`profile/${userId}`).then((response) => {
            console.log(response.data);
            return response.data;
        });
    },
    getStatus: (userId: number) => {
        return instance
            .get<string>(`profile/status/${userId}`)
            .then((response) => response.data);
    },
    updateStatus: (status: string) => {
        return instance
            .put<ResponseType>(`profile/status`, {status})
            .then((response) => response.data);
    },
};
