import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll() {
    return this.tasks;
  }

  create(title: string, description: string): Task {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }
}
