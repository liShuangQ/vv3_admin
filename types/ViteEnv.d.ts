type ImportMetaEnv = ViteEnv

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
interface ViteEnv {
  VITE_ROUTER_AUTOLOAD: boolean;
  VITE_SKIP_ROUTER_GUARD:boolean;
  VITE_TOKEN_KEY: string;
  VITE_IS_MOCK: boolean;
  VITE_BASE_URL: string;
  VITE_BUILD_NAME: string;
  VITE_CONFINE_DEVELOP: boolean;
  VITE_REAR_MENU: boolean;
  VITE_THROTTLE_TIME: number;
}
