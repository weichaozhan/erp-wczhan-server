import { JwtModuleOptions } from '@nestjs/jwt';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { Permission } from '../../permission/entities/permission.entity';
import { User } from '../../user/entities/user.entity';
import { SysModule } from '../../sysmodule/entities/sysmodule.entity';

import { JWT_EXPIRES, JWT_TEMP_EXPIRES } from '../constants';

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

  return [...modules.values()];
};

interface GetUserModulsParams {
  userId: number;
  userEntity: Repository<User>;
  moduleEntity: Repository<SysModule>;
  isMenu?: boolean;
}
export const getUserModuls = async ({
  userId,
  userEntity,
  moduleEntity,
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
