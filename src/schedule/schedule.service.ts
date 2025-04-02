import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { PrismaService } from "../prisma/prisma.service";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {
  }

  async create(dto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: {
        accountId: dto.accountId,
        agentId: dto.agentId,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
      },
    });
  }

  async findAll() {
    return this.prisma.schedule.findMany();
  }

  async findOne(id: string) {
    const schedule = await this.prisma.schedule.findUnique({where: {id}});
    if (!schedule) throw new NotFoundException(`Schedule ${id} not found`);
    return schedule;
  }

  async remove(id: string) {
    return this.prisma.schedule.delete({where: {id}});
  }

  async update(id: string, dto: UpdateScheduleDto) {}
}
