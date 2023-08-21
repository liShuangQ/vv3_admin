export interface Menu {
  name: string;
  path: string;
  redirect?: string;
  component: (()=>Promise<any> )| null;
  meta: {
    url?:string;
    title: string;
    icon?: string;
    show: boolean; //路由级别屏蔽
    menuHidden?: boolean; //菜单级别屏蔽
    auth?: boolean;
    parentPaths: string[];
  };
  children?: Menu[];
}
export interface Meta {
  title: string;
  icon?: string;
  show: boolean;
  auth?: boolean;
}
export interface HistoryMenu {
  title: string;
  selectedKeys: string;
  openKeys: string[];
}