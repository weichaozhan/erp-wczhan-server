import { Module } from '@nestjs/common';
import { SysmoduleController } from './sysmodule.controller';
import { SysmoduleService } from './sysmodule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysModule } from './entities/sysmodule.entity';

@Module({
  imports: [
    // Add your entities here
    TypeOrmModule.forFeature([SysModule]),
  ],
  controllers: [SysmoduleController],
  providers: [SysmoduleService],
})
export class SysmoduleModule {}
