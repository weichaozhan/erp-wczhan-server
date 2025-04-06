import { SYS_CREATER } from './index';

export const REL_ROLE_SYSM = 'role_sysmodule_relation';
export const REL_USER_ROLE = 'user_role_relation';

export const KEY_REL_USER = 'userId';
export const KEY_REL_ROLE = 'roleId';
export const KEY_REL_SYSM = 'sysmoduleId';

export const ROOT_MODULE = {
  name: 'rootModule',
  nameToShow: '根模块',
  description: '根模块，不属于任何菜单的权限均可放在该模块下',
  createBy: SYS_CREATER,
  isMenu: false,
};
export const MENU_MODULE = {
  name: 'menuManage',
  nameToShow: '菜单管理',
  description: '菜单管理，菜单增删改查',
  createBy: 'system',
  isMenu: true,
};

export const ROOT_MODULE_ID = 1;
export const MENU_MODULE_ID = 2;
