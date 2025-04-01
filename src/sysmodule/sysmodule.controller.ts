import { Body, Controller, Post } from '@nestjs/common';
import { SysmoduleService } from './sysmodule.service';
import { CreateSysModuleDto } from './dto/create-sysmodule.dto';

@Controller('sysmodule')
export class SysmoduleController {
  constructor(private readonly sysmoduleService: SysmoduleService) {}

  @Post()
  create(
    @Body()
    createSysModuleDto: CreateSysModuleDto,
  ) {
    return this.sysmoduleService.create(createSysModuleDto);
  }
}
