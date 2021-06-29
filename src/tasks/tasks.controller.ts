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
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Query() filters: GetTasksFilterDto, @GetUser() user: User) {
    return await this.tasksService.findAll(filters, user);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @GetUser() user: User) {
    return await this.tasksService.findById(id, user);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    const task = await this.tasksService.create(createTaskDto, user);

    return task;
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @GetUser() user: User) {
    await this.tasksService.delete(id, user);
  }

  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
    @GetUser() user: User
  ) {
    const task = await this.tasksService.updateStatus(id, status, user);

    return task;
  }
}
