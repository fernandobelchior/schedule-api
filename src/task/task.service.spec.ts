import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";

describe('TaskService', () => {
  let service: TaskService;

  const mockSchedule = {
    id: 'schedule-1',
    startTime: new Date('2025-04-04T09:00:00Z'),
    endTime: new Date('2025-04-04T17:00:00Z'),
  };

  const mockPrismaService = {
    schedule: {
      findUnique: jest.fn().mockResolvedValue(mockSchedule),
    },
    task: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should throw if task does not fit in schedule', async () => {
    const dto: CreateTaskDto = {
      accountId: 1,
      scheduleId: 'schedule-1',
      startTime: '2025-04-04T16:45:00Z', // 15 minutes before end
      duration: 30, // would end at 17:15 → invalid
      type: 'work',
    };

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('should create task if it fits in schedule', async () => {
    const dto: CreateTaskDto = {
      accountId: 1,
      scheduleId: 'schedule-1',
      startTime: '2025-04-04T10:00:00Z',
      duration: 60, // Ends at 11:00 — inside range
      type: 'work',
    };

    await service.create(dto);

    expect(mockPrismaService.task.create).toHaveBeenCalledWith({
      data: {
        accountId: dto.accountId,
        scheduleId: dto.scheduleId,
        startTime: new Date(dto.startTime),
        duration: dto.duration,
        type: dto.type,
      },
    });
  });
});


