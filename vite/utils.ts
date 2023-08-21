import { cloneDeep } from "lodash";

export function parseEnv(env: Record<string, any>): ViteEnv {
  const envs: any = cloneDeep(env);

  Object.entries(env).forEach(([k, v]) => {
    if (v === "true" || v === "false") {
      envs[k] = v === "true" ? true : false;
    } else if (/^\d+$/.test(v)) {
      envs[k] = Number(v);
    } else if (v === "null") {
      envs[k] = null;
    } else if (v === "undefined") {
      envs[k] = undefined;
    } else {
      envs[k] = v;
    }
  });
  return envs;
}
