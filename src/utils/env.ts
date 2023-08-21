import { cloneDeep } from "lodash";

let envs: any = cloneDeep(import.meta.env);
Object.entries(import.meta.env as Record<string, any>).forEach(([k, v]) => {
  if (v === "true" || v === "false") {
    envs[k] = v === "true" ? true : false;
  }
  if (/^\d+$/.test(v)) {
    envs[k] = Number(v);
  }
  if (v === "null") {
    envs[k] = null;
  }
  if (v === "undefined") {
    envs[k] = undefined;
  }
});

export default envs as ViteEnv;
