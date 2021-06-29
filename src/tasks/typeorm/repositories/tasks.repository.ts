import { EntityRepository, Repository } from 'typeorm';

import { CreateTaskDto } from '../../dto/create-task.dto';
import { GetTasksFilterDto } from '../../dto/get-tasks-filter.dto';
import { TaskStatus } from '../../tasks-status.enum';
import { Task } from '../entities/tasks.entity';
import { User } from '../../../auth/typeorm/entities/user.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getAll(filters: GetTasksFilterDto, user: User) {
    const query = this.createQueryBuilder('task').where({ user });

    if (filters.status) {
      query.andWhere('task.status = :status', { status: filters.status });
    }

    if (filters.search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${filters.search}%` }
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });

    await this.save(task);

    return task;
  }
}
