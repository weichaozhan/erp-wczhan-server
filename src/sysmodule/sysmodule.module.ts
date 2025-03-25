import { Module } from '@nestjs/common';
import { SysmoduleController } from './sysmodule.controller';
import { SysmoduleService } from './sysmodule.service';

@Module({
  controllers: [SysmoduleController],
  providers: [SysmoduleService],
})
export class SysmoduleModule {}
