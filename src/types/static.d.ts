export interface AuthObj {
  DBPwd: string;
}

export interface ApiResponse {
  code: number;
  message: string;
  data?: any;
  [key: string]: any;
}
