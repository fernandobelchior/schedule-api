import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import {TasksService} from "../tasks/tasks.service";

describe('ScheduleController', () => {
  let controller: SchedulesController;
  let service: SchedulesService;
  let tasksService: TasksService;

  const mockSchedule = {
    id: 'schedules-1',
    accountId: 1,
    agentId: 2,
    startTime: new Date('2025-04-04T09:00:00Z'),
    endTime: new Date('2025-04-04T17:00:00Z'),
  };

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockSchedule]),
    create: jest.fn().mockResolvedValue(mockSchedule),
    update: jest.fn().mockResolvedValue({ ...mockSchedule, agentId: 3 }),
    remove: jest.fn().mockResolvedValue(mockSchedule),
  };

  const mockTasks = [
    {
      id: 'task-1',
      scheduleId: 'schedule-123',
      type: 'work',
      duration: 60,
      startTime: new Date('2025-04-04T10:00:00Z'),
    },
  ];

  const mockTasksService = {
    findBySchedule: jest.fn().mockResolvedValue(mockTasks),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        {
          provide: SchedulesService,
          useValue: mockService,
        },
        {
          provide: TasksService,
          useValue: mockTasksService,
        }
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
    service = module.get<SchedulesService>(SchedulesService);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of schedules', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockSchedule]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new schedules', async () => {
      const dto: CreateScheduleDto = {
        accountId: 1,
        agentId: 2,
        startTime: new Date('2025-04-04T09:00:00Z').toISOString(),
        endTime: new Date('2025-04-04T17:00:00Z').toISOString(),
      };

      const result = await controller.create(dto);
      expect(result).toEqual(mockSchedule);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a schedules', async () => {
      const dto: UpdateScheduleDto = { agentId: 3 };
      const result = await controller.update('schedules-1', dto);
      expect(result).toEqual({ ...mockSchedule, agentId: 3 });
      expect(service.update).toHaveBeenCalledWith('schedules-1', dto);
    });
  });

  describe('delete', () => {
    it('should delete a schedules', async () => {
      const result = await controller.remove('schedules-1');
      expect(result).toEqual(mockSchedule);
      expect(service.remove).toHaveBeenCalledWith('schedules-1');
    });
  });

  describe('getTasksBySchedule()', () => {
    it('should return tasks for the given scheduleId', async () => {
      const scheduleId = 'schedule-123';
      const result = await controller.getTasksBySchedule(scheduleId);

      expect(result).toEqual(mockTasks);
      expect(tasksService.findBySchedule).toHaveBeenCalledWith(scheduleId);
    });
  });
});
