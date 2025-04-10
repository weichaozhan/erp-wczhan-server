import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  Post,
  Req,
} from '@nestjs/common';
import { SysmoduleService } from './sysmodule.service';
import { CreateSysModuleDto } from './dto/create-sysmodule.dto';
import { Request } from 'express';

@Controller('sysmodule')
export class SysmoduleController {
  constructor(private readonly sysmoduleService: SysmoduleService) {}

  @Post()
  create(
    @Body()
    createSysModuleDto: CreateSysModuleDto,
    @Req() req: Request,
  ) {
    return this.sysmoduleService.create(createSysModuleDto, req.user);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    createSysModuleDto: CreateSysModuleDto,
  ) {
    return this.sysmoduleService.update(+id, createSysModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysmoduleService.remove(+id);
  }
}
