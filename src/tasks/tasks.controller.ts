import {Controller, Get, Post, Body, Put, Patch, Param, Delete, Version, ParseUUIDPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Version('1')
  createV1(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Returns a list of tasks.' })
  findAllV1() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @Version('1')
  update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
