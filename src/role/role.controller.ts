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

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.roleService.findAll(query);
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
  ) {
    return this.roleService.update(+id, body);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.roleService.remove(+id);
  }
}
