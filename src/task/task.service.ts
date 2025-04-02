import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const schedule = await this.validateScheduleExists(dto.scheduleId);
    this.ensureTaskFitsSchedule(dto.startTime, dto.duration, schedule);

    return this.prisma.task.create({
      data: {
        accountId: dto.accountId,
        scheduleId: dto.scheduleId,
        startTime: new Date(dto.startTime),
        duration: dto.duration,
        type: dto.type,
      },
    });
  }

  private async validateScheduleExists(scheduleId: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new BadRequestException(`Schedule ID ${scheduleId} not found`);
    }

    return schedule;
  }

  private ensureTaskFitsSchedule(
      taskStartISO: string,
      durationMinutes: number,
      schedule: { startTime: Date; endTime: Date },
  ) {
    const taskStart = new Date(taskStartISO);
    const taskEnd = new Date(taskStart.getTime() + durationMinutes * 60_000);
    const scheduleStart = new Date(schedule.startTime);
    const scheduleEnd = new Date(schedule.endTime);

    const isInsideSchedule =
        taskStart >= scheduleStart && taskEnd <= scheduleEnd;

    if (!isInsideSchedule) {
      throw new BadRequestException(
          `Task must fit within schedule time range: ` +
          `${scheduleStart.toISOString()} to ${scheduleEnd.toISOString()}. ` +
          `Got start=${taskStart.toISOString()}, end=${taskEnd.toISOString()}`,
      );
    }
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: string, dto: UpdateTaskDto) {
    // Optional: check if task exists first
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.delete({ where: { id } });
  }
}
