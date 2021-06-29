import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './tasks-status.enum';
import { TasksRepository } from './typeorm/repositories/tasks.repository';
import { User } from '../auth/typeorm/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository
  ) {}

  async findAll(filters: GetTasksFilterDto, user: User) {
    const tasks = await this.tasksRepository.getAll(filters, user);

    return tasks;
  }

  async findById(id: string, user: User) {
    const task = await this.tasksRepository.findOne(id, { where: { user } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto, user: User) {
    const task = this.tasksRepository.createTask(createTaskDto, user);

    return task;
  }

  async delete(id: string, user: User) {
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateStatus(id: string, status: TaskStatus, user: User) {
    const task = await this.tasksRepository.findOne(id, { where: { user } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }
}
