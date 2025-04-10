import { Request } from 'express';
import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

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

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.roleService.remove(+id);
  }
}
