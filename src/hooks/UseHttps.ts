import { http } from "@/plugins/axios";
import { MyAxiosRequestConfig } from "@/plugins/axios/Axios";

const Https = {
  post<T>(request: MyAxiosRequestConfig) {
    request.method = 'post'
    return http.request<T>(request);
  },

};
export default Https;
