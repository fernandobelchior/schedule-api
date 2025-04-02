import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskType } from '@prisma/client';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTasks = [
    { id: 'uuid-1', type: 'work' },
    { id: 'uuid-2', type: 'break' },
  ];

  const mockTaskService = {
    findAll: jest.fn().mockResolvedValue(mockTasks),
    create: jest.fn().mockResolvedValue(mockTasks[0]),
    update: jest.fn().mockResolvedValue({ id: 'uuid-1', type: 'break' }),
    delete: jest.fn().mockResolvedValue({ id: 'uuid-1', deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllV1', () => {
    it('should return all tasks', async () => {
      const result = await controller.findAllV1();
      expect(result).toEqual(mockTasks);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('createV1', () => {
    it('should create a task', async () => {
      const dto: CreateTaskDto = {
        accountId: 1,
        scheduleId: 'schedule-1',
        startTime: '2025-04-04T10:00:00Z',
        duration: 30,
        type: TaskType.work,
      };

      const result = await controller.createV1(dto);
      expect(result).toEqual(mockTasks[0]);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const dto: UpdateTaskDto = { type: TaskType.break };
      const result = await controller.update('uuid-1', dto);

      expect(result).toEqual({ id: 'uuid-1', type: 'break' });
      expect(service.update).toHaveBeenCalledWith('uuid-1', dto);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const result = await controller.remove('uuid-1');

      expect(result).toEqual({ id: 'uuid-1', deleted: true });
      expect(service.delete).toHaveBeenCalledWith('uuid-1');
    });
  });
});
