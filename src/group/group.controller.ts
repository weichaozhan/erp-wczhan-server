import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Post()
  create(@Body() body: CreateGroupDto) {
    console.log('body', body);
    return 'success';
  }
}
