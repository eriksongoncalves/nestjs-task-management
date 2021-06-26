import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string
  ) {
    const task = this.tasksService.create(title, description);

    return task;
  }
}
