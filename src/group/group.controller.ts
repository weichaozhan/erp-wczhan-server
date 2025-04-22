import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { PaginationDto } from '../global/global.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.groupService.findAll(query);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
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
}
