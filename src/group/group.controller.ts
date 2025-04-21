import { Controller, Get, Param } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }
}
