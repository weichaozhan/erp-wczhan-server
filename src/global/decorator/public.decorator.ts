import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_IGNORE_TRANS = 'isIgnoreTrans';
export const IgnoreTrans = () => SetMetadata(IS_IGNORE_TRANS, true);

export const PERMISSION_KEY = 'permissionKey';
export const setPermissionKey = (key) => SetMetadata(PERMISSION_KEY, key);
