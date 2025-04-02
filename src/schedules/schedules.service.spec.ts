import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ScheduleService', () => {
  let service: SchedulesService;

  const mockPrisma = {
    schedule: {
      findMany: jest.fn().mockResolvedValue([{ id: 'schedules-1' }]),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all schedules', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 'schedules-1' }]);
    expect(mockPrisma.schedule.findMany).toHaveBeenCalled();
  });

  it('should throw if schedules not found (update)', async () => {
    mockPrisma.schedule.findUnique.mockResolvedValue(null);

    await expect(
        service.update('schedules-404', { agentId: 2 }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update schedules if it exists', async () => {
    mockPrisma.schedule.findUnique.mockResolvedValue({ id: 'schedules-1' });
    mockPrisma.schedule.update.mockResolvedValue({ id: 'schedules-1', agentId: 2 });

    const result = await service.update('schedules-1', { agentId: 2 });
    expect(result).toEqual({ id: 'schedules-1', agentId: 2 });
  });

  it('should delete schedules if it exists', async () => {
    mockPrisma.schedule.findUnique.mockResolvedValue({ id: 'schedules-1' });
    mockPrisma.schedule.delete.mockResolvedValue({ id: 'schedules-1' });

    const result = await service.remove('schedules-1');
    expect(result).toEqual({ id: 'schedules-1' });
  });
});
