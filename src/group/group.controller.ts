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
import { Request } from 'express';

import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { PaginationDto } from '../global/global.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  findAll(
    @Query()
    query: PaginationDto,
    @Req()
    req: Request,
  ) {
    return this.groupService.findAll(query, req.user);
  }

  @Get('detail/:id')
  findOne(
    @Param('id')
    id: string,
    @Req()
    req: Request,
  ) {
    return this.groupService.findOne(+id, req.user);
  }

  @Post()
  create(
    @Body()
    body: CreateGroupDto,
    @Req()
    req: Request,
  ) {
    return this.groupService.create(body, req.user);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    body: UpdateGroupDto,
    @Req()
    req: Request,
  ) {
    return this.groupService.update(+id, body, req.user);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
    @Req()
    req: Request,
  ) {
    return this.groupService.remove(+id, req.user);
  }
}
