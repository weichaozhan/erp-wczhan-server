import { SysModule } from '../../sysmodule/entities/sysmodule.entity';
import { SYS_CREATER } from './index';

export const REL_ROLE_SYSM = 'role_sysmodule_relation';
export const REL_ROLE_PERMISSION = 'role_permission_relation';
export const REL_USER_ROLE = 'user_role_relation';
export const REL__GROUP_USER = 'group_user_relation';

export const KEY_REL_USER = 'userId';
export const KEY_REL_GROUP = 'groupId';
export const KEY_REL_ROLE = 'roleId';
export const KEY_REL_SYSM = 'sysmoduleId';
export const KEY_REL_PERMISSION = 'permissionId';

export const USER_FIRST_ID = 1;

export const ROLE_ADMIN_ID = 1;

export const ROOT_MODULE = {
  name: 'rootModule',
  nameToShow: '根模块',
  description: '根模块，不属于任何菜单的权限均可放在该模块下',
  createBy: SYS_CREATER,
  isMenu: false,
};
export const AUTH_MODULE: Partial<SysModule> = {
  name: 'authManage',
  nameToShow: '权限管理',
  description: '权限管理，权限增删改查',
  createBy: SYS_CREATER,
  isMenu: true,
  path: '/auth',
};

export const ROOT_MODULE_ID = 1;
export const AUTH_MODULE_ID = 2;
