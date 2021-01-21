import axios from 'axios';
import {UserType} from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'b7860367-391c-45f1-b119-93fb166cfbad',
  },
});

export enum ResultCodesEnum  {
  Success = 0,
  Error = 1
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}


export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}
