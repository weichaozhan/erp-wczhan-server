import { IsInstance, IsNotEmpty, IsOptional, Matches } from 'class-validator';

import { SysModule } from '../../sysmodule/entities/sysmodule.entity';
import { Permission } from '../../permission/entities/permission.entity';

export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名称不能为空' })
  @Matches(/^(\d|\w|_|[\u4e00-\u9fa5])+$/, {
    message: '角色名称只允许字母数字下划线及汉字组成',
  })
  name: string;

  @IsNotEmpty({ message: '角色展示名称不能为空' })
  nameToShow: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsInstance(Object, { each: true })
  sysModules: SysModule[];

  @IsOptional()
  @IsInstance(Object, { each: true })
  permissions: Permission[];
}
