export interface AuthObj {
  DBPwd: string;
}

export interface ApiResponse {
  code: number;
  message: string;
  data?: any;
  [key: string]: any;
}

interface PayloadAuth {
  roles: number[];
  permissions: number[];
}

export type JWTPayload = Omit<Partial<User>, 'roles'> & PayloadAuth;

export type MenuListNode = SysModule & { children?: MenuListNode[] };
