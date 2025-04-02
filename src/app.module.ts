import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './prisma/prisma.service';
import { SchedulesModule } from './schedules/schedules.module';
import { ExistsRule } from "./common/validators/exists.rule";

@Module({
  imports: [TasksModule, SchedulesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ExistsRule],
  exports: [PrismaService],
})
export class AppModule {}
