import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ScheduleService', () => {
  let service: ScheduleService;

  const mockPrisma = {
    schedule: {
      findMany: jest.fn().mockResolvedValue([{ id: 'schedule-1' }]),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all schedules', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 'schedule-1' }]);
    expect(mockPrisma.schedule.findMany).toHaveBeenCalled();
  });

  it('should throw if schedule not found (update)', async () => {
    mockPrisma.schedule.findUnique.mockResolvedValue(null);

    await expect(
        service.update('schedule-404', { agentId: 2 }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update schedule if it exists', async () => {
    mockPrisma.schedule.findUnique.mockResolvedValue({ id: 'schedule-1' });
    mockPrisma.schedule.update.mockResolvedValue({ id: 'schedule-1', agentId: 2 });

    const result = await service.update('schedule-1', { agentId: 2 });
    expect(result).toEqual({ id: 'schedule-1', agentId: 2 });
  });

  it('should delete schedule if it exists', async () => {
    mockPrisma.schedule.findUnique.mockResolvedValue({ id: 'schedule-1' });
    mockPrisma.schedule.delete.mockResolvedValue({ id: 'schedule-1' });

    const result = await service.remove('schedule-1');
    expect(result).toEqual({ id: 'schedule-1' });
  });
});
