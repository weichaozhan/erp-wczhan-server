import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateSysModuleDto {
  @IsNotEmpty({ message: '模块名不能为空' })
  @Matches(/^(\d|\w|_|[\u4e00-\u9fa5])+$/, {
    message: '模块名只允许字母数字下划线及汉字组成',
  })
  name: string;

  @IsNotEmpty({ message: '模块展示名称不能为空' })
  nameToShow: string;

  @IsNotEmpty({ message: '模块是否为菜单不能为空' })
  isMenu: boolean;

  @IsOptional()
  parentID?: number;

  @IsOptional()
  path?: string;
}
