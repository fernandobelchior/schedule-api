import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskType } from '@prisma/client';

describe('TaskController', () => {
  let controller: TasksController;
  let service: TasksService;

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
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
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
    it('should create a tasks', async () => {
      const dto: CreateTaskDto = {
        accountId: 1,
        scheduleId: 'schedules-1',
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
    it('should update a tasks', async () => {
      const dto: UpdateTaskDto = { type: TaskType.break };
      const result = await controller.update('uuid-1', dto);

      expect(result).toEqual({ id: 'uuid-1', type: 'break' });
      expect(service.update).toHaveBeenCalledWith('uuid-1', dto);
    });
  });

  describe('delete', () => {
    it('should delete a tasks', async () => {
      const result = await controller.remove('uuid-1');

      expect(result).toEqual({ id: 'uuid-1', deleted: true });
      expect(service.delete).toHaveBeenCalledWith('uuid-1');
    });
  });
});
