import {Controller, Get, Post, Body, Patch, Param, Delete, Version} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(
      private readonly scheduleService: ScheduleService
  ) {}

  @Post()
  @Version('1')
  create(
      @Body() dto: CreateScheduleDto){
    return this.scheduleService.create(dto);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
