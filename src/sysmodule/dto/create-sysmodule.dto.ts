import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateSysModuleDto {
  @IsNotEmpty({ message: '模块名名不能为空' })
  @Matches(/^(\d|\w|_|[\u4e00-\u9fa5])+$/, {
    message: '用户名只允许字母数字下划线及汉字组成',
  })
  name: string;
  @IsOptional()
  parentID?: number;
}
