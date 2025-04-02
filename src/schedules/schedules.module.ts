import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import {PrismaService} from "../prisma/prisma.service";
import {TasksService} from "../tasks/tasks.service";
import {ExistsRule} from "../common/validators/exists.rule";

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService, TasksService, PrismaService, ExistsRule],
})
export class SchedulesModule {}
