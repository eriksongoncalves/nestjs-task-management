import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  HttpStatus,
  Delete,
  Patch,
  Query
} from '@nestjs/common';
import { Response } from 'express';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(@Query() filtersDto: GetTasksFilterDto) {
    return this.tasksService.findAll(filtersDto);
  }

  @Get('/:id')
  findById(@Param('id') id: string, @Res() res: Response) {
    const task = this.tasksService.findById(id);

    if (task) {
      return res.json(task);
    }

    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Task not found' });
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    const task = this.tasksService.create(createTaskDto);

    return res.status(HttpStatus.CREATED).json(task);
  }

  @Delete('/:id')
  delete(@Param('id') id: string, @Res() res: Response) {
    this.tasksService.delete(id);

    return res.status(HttpStatus.NO_CONTENT).json({});
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
    @Res() res: Response
  ) {
    const task = this.tasksService.updateStatus(id, status);

    if (task) {
      return res.json(task);
    }

    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Task not found' });
  }
}
