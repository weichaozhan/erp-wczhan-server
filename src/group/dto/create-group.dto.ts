import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty({
    message: '群组名称不可为空',
  })
  name: string;

  @IsOptional()
  @IsArray({ message: '用户ids必须为数字数组！' })
  @IsNumber({}, { each: true, message: '用户id必须为数字！' })
  userIds: number[];
}
