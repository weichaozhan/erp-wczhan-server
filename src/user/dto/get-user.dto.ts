import { IsOptional, Matches } from 'class-validator';

import { PaginationDto } from '../../global/global.dto';

export class GetUserDto extends PaginationDto {
  @IsOptional()
  @Matches(/^(\d+,)*\d+$/, {
    message: `groups 是逗号拼接数字的字符串，例如：'1,2,3'`,
  })
  groups: string;
}
