import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { Role } from 'src/role/entities/role.entity';
import { Group } from 'src/group/entity/group.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  frozen?: boolean;
  @IsOptional()
  roles?: Role[];
  @IsOptional()
  groups?: Group[];
}
