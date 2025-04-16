import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { PaginationDto } from '../global/global.dto';
import { SetPermissionKey } from '../global/decorator/public.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @SetPermissionKey('get_roles')
  @Get()
  findAll(
    @Query()
    query: PaginationDto,
    @Req()
    req: Request,
  ) {
    const { user } = req;
    return this.roleService.findAll(query, user);
  }

  @Post()
  create(
    @Body()
    body: CreateRoleDto,
    @Req()
    req: Request,
  ) {
    const { user } = req;
    return this.roleService.create(body, user);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    body: CreateRoleDto,
    @Req()
    req: Request,
  ) {
    const { user } = req;
    return this.roleService.update(+id, body, user);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
    @Req()
    req: Request,
  ) {
    const { user } = req;
    return this.roleService.remove(+id, user);
  }
}
