import store from "@/utils/store";
import axios, {AxiosRequestConfig} from "axios";
import {env} from "@/utils";
import ability from "@/store/ability";
import * as qs from "qs";

export interface MyAxiosRequestConfig extends AxiosRequestConfig {
    throttle?: boolean
    spinning?: boolean
    contentType?: 'form' | 'json'
}

export default class Axios {
    private instance;
    private lastTime;
    private throttleTime;
    private abilityStore;

    constructor(config: MyAxiosRequestConfig) {
        this.instance = axios.create(config);
        this.abilityStore = null as any
        this.interceptors();
        this.lastTime = 0
        this.throttleTime = env.VITE_THROTTLE_TIME
    }

    public request<T, D = ResponseResult<T>>(config: MyAxiosRequestConfig) {
        if (!this.abilityStore) {
            this.abilityStore = ability()
        }
        return new Promise(async (res, rej) => {
            try {
                config['contentType'] = config?.contentType ?? 'form'
                if (config.contentType === 'form') {
                    config.data = qs.stringify(config.data)
                    config.headers && (config.headers['Content-Type'] = 'application/x-www-form-urlencoded')
                } else {
                    config.headers && (config.headers['Content-Type'] = 'application/json')
                }
                const response = await this.instance.request<D>(config);
                //处理直接返回数据
                res(response.data);
            } catch (error) {
                rej(error);
            }
        }) as Promise<D>;
    }

    public jsonp(url: string, data: any) {
        if (!url)
            throw new Error('url is necessary')
        const callback = 'CALLBACK' + Math.random().toString().substr(9, 18)
        const JSONP = document.createElement('script')
        JSONP.setAttribute('type', 'text/javascript')

        const headEle = document.getElementsByTagName('head')[0]

        let ret = '';
        if (data) {
            if (typeof data === 'string')
                ret = '&' + data;
            else if (typeof data === 'object') {
                for (let key in data)
                    ret += '&' + key + '=' + encodeURIComponent(data[key]);
            }
            ret += '&_time=' + Date.now();
        }
        JSONP.src = `${url}?callback=${callback}${ret}`;
        return new Promise((resolve) => {
            window[callback] = (r: any) => {
                resolve(r)
                headEle.removeChild(JSONP)
                delete window[callback]
            }
            headEle.appendChild(JSONP)
        })
    }

    private interceptors() {
        // 添加请求拦截器
        this.interceptorsRequest();
        // 添加响应拦截器
        this.interceptorsResponse();
    }

    private interceptorsRequest() {
        this.instance.interceptors.request.use(
            (config: MyAxiosRequestConfig) => {

                if (config.throttle) {
                    const nowTime = new Date().getTime()

                    if (nowTime - this.lastTime < this.throttleTime) {
                        // message.error(`操作过于频繁，请${this.throttleTime}ms后重试`);
                        return Promise.reject({response: {status: 'Throttling'}})
                    }
                    this.lastTime = nowTime
                }
                config.spinning && this.abilityStore.setSpinning(true);
                // 在发送请求之前做些什么 (NODE: 携带token,不是覆盖,为了在方法中可自定义)
                config.headers && (config.headers[env.VITE_TOKEN_KEY] = store.token())
                return config

            },
            (error) => {
                // 对请求错误做些什么
                return Promise.reject(error);
            }
        );
    }

    private interceptorsResponse() {
        this.instance.interceptors.response.use(
            (response) => {
                this.abilityStore.getSpinning() && this.abilityStore.setSpinning(false);

                // 2xx 范围内的状态码都会触发该函数。
                // 对响应数据做点什么
                return response;
            },
            (error) => {
                this.abilityStore.getSpinning() && this.abilityStore.setSpinning(false);

                // 超出 2xx 范围的状态码都会触发该函数。
                // 对响应错误做点什么
                // switch (error.response.status) {
                //     case 'Throttling':
                //         break;
                //     case 401:
                //         user().userLogOut();
                //         break;
                //     case 422:
                //         message.error("表单验证错误");
                //         break;
                //     default:
                // }
                return Promise.reject(error);
            }
        );
    }
}
