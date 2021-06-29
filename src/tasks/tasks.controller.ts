import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Query() filters: GetTasksFilterDto) {
    return await this.tasksService.findAll(filters);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.tasksService.findById(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);

    return task;
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.tasksService.delete(id);
  }

  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus
  ) {
    const task = await this.tasksService.updateStatus(id, status);

    return task;
  }
}
