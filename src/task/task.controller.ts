import {Controller, Get, Post, Body, Put, Patch, Param, Delete, Version, ParseUUIDPipe} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Version('1')
  createV1(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @Version('1')
  findAllV1() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @Version('1')
  update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
