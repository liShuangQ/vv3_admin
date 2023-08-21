import { http } from "@/plugins/axios";
export interface User {
  name: string;
  age: number;
  lang: string;
  headPortrait: string;
  menus?: object;
}

export function info(data: any = {}) {
  return http.request<User>({
    url: "user/info",
    method: "post",
    data,
    headers: {},
  });
}

interface Login {
  token: string;
}
export interface UserLoginData {
  id: string;
  password: string;
}
export function login(data: UserLoginData) {
  return http.request<Login>({
    url: "user/login",
    method: "post",
    data,
  });
}
