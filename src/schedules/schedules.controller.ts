import {Controller, Get, Post, Body, Patch, Param, Delete, Version} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import {TasksService} from "../tasks/tasks.service";

@Controller('schedules')
export class SchedulesController {
  constructor(
      private readonly schedulesService: SchedulesService,
      private readonly tasksService: TasksService
  ) {}

  @Post()
  @Version('1')
  create(
      @Body() dto: CreateScheduleDto){
    console.log(123);
    return this.schedulesService.create(dto);
  }

  @Get()
  @Version('1')
  findAll() {
    console.log('🔥 Reached controller');
    return [{ hello: 'world' }];
    //return this.schedulesService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }

  @Get(':scheduleId/tasks')
  @Version('1')
  getTasksBySchedule(@Param('scheduleId') scheduleId: string) {
    return this.tasksService.findBySchedule(scheduleId);
  }
}
