import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';
import { ScheduleModule } from './schedule/schedule.module';
import { ExistsRule } from "./common/validators/exists.rule";

@Module({
  imports: [TaskModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ExistsRule],
  exports: [PrismaService],
})
export class AppModule {}
