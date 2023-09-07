import { User, login, UserLoginData } from "@/apis/user";
import { defineStore } from "pinia";
import router from "@/router";
import { env, store } from "@/utils";
import MenuRouter from "./MenuRoute";
export default defineStore("user", {
    state: () => {
        return {
            info: null as null | User,
        };
    },
    actions: {
    //设置用户信息
        setUserInfo(data: User) {
            this.info = data;
        },
        //清除用户信息
        clearUserInfo() {
            this.info = null;
        },
        //登录
        async userLogin(userData: UserLoginData) {
            let loginData = await login(userData);
            let token = loginData.data.token;
            store.set(env.VITE_TOKEN_KEY, {
                expire: 20,
                token,
            });
            router.push({ name: "admin" });
        },
        //前端登出
        userLogOut() {
            this.info = null;
            localStorage.removeItem(env.VITE_TOKEN_KEY);
            MenuRouter().clearState();
            router.push({ name: "login" });
        },
    },
});
