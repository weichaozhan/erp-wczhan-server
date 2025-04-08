import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: '权限名不能为空' })
  @Matches(/^(\d|\w|_)+$/, {
    message: '权限名只允许字母数字下划线组成',
  })
  name: string;

  @IsNotEmpty({ message: '权限展示名称不能为空' })
  nameDesc: string;

  @IsNotEmpty({ message: '权限所属模块ID不能为空' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    {
      message: '权限所属模块ID必须为数字',
    },
  )
  parentID: number;

  @IsOptional()
  description?: string;
}
