interface ResponseResult<T> {
  code: number;
  success: boolean;
  msg: string;
  data: T;
}
// ResponseResult<{a:string}>