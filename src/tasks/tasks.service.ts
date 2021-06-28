import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(filtersDto: GetTasksFilterDto) {
    let tasksFiltered = this.tasks;

    if (filtersDto.status) {
      tasksFiltered = this.tasks.filter(
        task => task.status === filtersDto.status
      );
    }

    if (filtersDto.search) {
      tasksFiltered = tasksFiltered.filter(
        task =>
          task.title.includes(filtersDto.search) ||
          task.description.includes(filtersDto.search)
      );
    }

    return tasksFiltered;
  }

  findById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  create({ title, description }: CreateTaskDto): Task {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }

  delete(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task | null {
    const task = this.findById(id);

    if (task) {
      task.status = status;

      return task;
    }

    return null;
  }
}
