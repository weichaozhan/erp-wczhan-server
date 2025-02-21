import { IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty({ message: '页码不能为空且必须为数字' })
  page: number;

  @IsNotEmpty({ message: '页大小不能为空且必须为数字' })
  size: number;
}
