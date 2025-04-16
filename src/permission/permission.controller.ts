import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Request } from 'express';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(
    @Req()
    request: Request,
    @Body()
    createPermissionDto: CreatePermissionDto,
  ) {
    return this.permissionService.create(createPermissionDto, request.user);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
    @Req()
    req: Request,
  ) {
    return this.permissionService.remove(+id, req.user);
  }
}
