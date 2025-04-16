import { JwtModuleOptions } from '@nestjs/jwt';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { Permission } from '../../permission/entities/permission.entity';
import { User } from '../../user/entities/user.entity';
import { SysModule } from '../../sysmodule/entities/sysmodule.entity';

import { JWT_EXPIRES, JWT_TEMP_EXPIRES } from '../constants';
import { ROLE_ADMIN_ID } from '../constants/entity';

export async function isFiledExit<T>(
  tableRepository: Repository<T>,
  filedName: string,
  val: any | any[],
) {
  const result = await tableRepository.findOneBy({
    [filedName]: val,
  } as FindOptionsWhere<T>);
  return !!result;
}

const getAllModulesMap = async (
  moduleEntity: Repository<SysModule>,
  isMenu,
) => {
  const userOptions: FindManyOptions<SysModule> = {
    relations: ['permissions'],
  };

  if (isMenu) {
    userOptions.where = { isMenu: true };
  }
  const allModules = await moduleEntity?.find?.(userOptions);

  const mMap = new Map<number, SysModule>();
  allModules?.forEach?.((item) => {
    mMap.set(item.id, item);
  });

  return mMap;
};

const buildRelationModules = (
  allModuleMap: Map<number, SysModule>,
  leafModuleIds: number[],
  permMap: Map<number, Permission>,
) => {
  const modules = new Map<number, SysModule>();

  const resetModulePerms = (module: SysModule) => {
    const perms = module.permissions.filter((perm) => permMap.has(perm.id));
    module.permissions = perms;
    return module;
  };

  const findParents = (child: SysModule) => {
    if (child.parentID) {
      const parent = allModuleMap.get(child.parentID);

      if (parent) {
        modules.set(parent.id, resetModulePerms(parent));
        if (parent.parentID) {
          findParents(parent);
        }
      }
    }
  };

  leafModuleIds.forEach((id) => {
    const module = allModuleMap.get(id);

    if (module) {
      modules.set(module.id, resetModulePerms(module));
      findParents(module);
    }
  });

  const result = [...modules.values()];

  allModuleMap.clear();
  permMap.clear();
  modules.clear();

  return result;
};

const getUserCreateMPs = async (
  moduleEntity: Repository<SysModule>,
  permissionEntity: Repository<Permission>,
  userId: number,
  leafModulesSet: Set<number>,
  permMap: Map<number, Permission>,
) => {
  const userCreateMdules = await moduleEntity?.find?.({
    where: {
      creatorId: userId,
    },
  });
  userCreateMdules?.forEach?.((m) => {
    leafModulesSet.add(m.id);
  });

  const userCreateperms = await permissionEntity?.find?.({
    where: {
      creatorId: userId,
    },
  });
  userCreateperms?.forEach?.((p) => {
    permMap.set(p.id, p);
  });
};

interface GetUserModulsParams {
  userId: number;
  userEntity: Repository<User>;
  moduleEntity: Repository<SysModule>;
  permissionEntity?: Repository<Permission>;
  isMenu?: boolean;
}
export const getUserModuls = async ({
  userId,
  userEntity,
  moduleEntity,
  permissionEntity,
  isMenu,
}: GetUserModulsParams): Promise<SysModule[]> => {
  const mMap = await getAllModulesMap(moduleEntity, isMenu);

  const userData = await userEntity?.findOne?.({
    where: { id: userId },
    relations: ['roles', 'roles.permissions', 'roles.sysModules'],
  });
  const { roles } = userData ?? {};

  const leafModulesSet: Set<number> = new Set();

  const permMap: Map<number, Permission> = new Map();

  if (!isMenu) {
    await getUserCreateMPs(
      moduleEntity,
      permissionEntity,
      userId,
      leafModulesSet,
      permMap,
    );
  }

  roles?.forEach?.((role) => {
    const rolPerm = role.permissions;
    const rolSysModules = role.sysModules;

    rolSysModules.forEach((sysModule) => {
      leafModulesSet.add(sysModule.id);
    });

    rolPerm.forEach((perm) => {
      permMap.set(perm.id, perm);
    });
  });

  for (const perm of permMap.values()) {
    if (perm.parentID) {
      const parent = mMap.get(perm.parentID);
      if (parent) {
        leafModulesSet.add(parent.id);
      }
    }
  }

  return buildRelationModules(mMap, Array.from(leafModulesSet), permMap);
};

export const isEmail = (emailStr: string) =>
  /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/.test(emailStr);

type GetJWTOptions = (isTemp?: boolean) => JwtModuleOptions;
export const getJWTOptions: GetJWTOptions = (isTemp = false) => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: isTemp ? JWT_TEMP_EXPIRES : JWT_EXPIRES,
  },
});

export const getCaptchaKey = (id: string) => `${id}_captcha_key`;

export const isUserAdmin = async (
  userId: number,
  userEntity?: Repository<User>,
) => {
  const user = await userEntity?.findOne?.({
    where: { id: userId },
  });
  return user?.roles?.some?.((role) => role.id === ROLE_ADMIN_ID);
};

interface HasPermToOperateRowParams<T> {
  userId: number;
  rowId: number;
  entity?: Repository<T>;
  userEntity?: Repository<User>;
}
export const hasPermToOperateRow = async <T>({
  userId,
  rowId,
  entity,
  userEntity,
}: HasPermToOperateRowParams<T>) => {
  const isAdmin = await isUserAdmin(userId, userEntity);
  if (isAdmin) {
    return true;
  }
  const row = await entity.findOne({
    where: { id: rowId, creatorId: userId } as unknown as FindOptionsWhere<T>,
  });

  return !!row;
};
