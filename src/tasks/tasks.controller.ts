import { Controller, Get, Post, Body, Put, Param, Delete,Req, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req): Promise<Task> {
    const userId = req.body.userId; // Assuming req.user has the authenticated user's information
    console.log(userId);
    
    return this.tasksService.create({ ...createTaskDto, userId });
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req): Promise<Task | null> {
    const userId = req.body.userId; // Assuming req.user has the authenticated user's information
    return this.tasksService.findOneByUserId(id, userId);
  }

   // New endpoint to change task status to completed
  @Patch(':id/completed')
  async markTaskAsCompleted(@Param('id') id: string, @Req() req: any): Promise<Task> {
    const userId = req.body.email; // Assuming you have the authenticated user in req.user
    console.log(userId);
    console.log(id);
    console.log("===============================================");
    return await this.tasksService.updateStatus(id, userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req): Promise<Task | null> {
    console.log("put");
    
    const userId = req.body.userId; // Assuming req.user has the authenticated user's information
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req): Promise<Task | null> {
    const userId = req.body.userId; // Assuming req.user has the authenticated user's information
    return this.tasksService.delete(id, userId);
  }
  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any, // Assuming you have the authenticated user in req.user
  ): Promise<Task> {
    console.log("patch");
    const userId = req.body.userId; // Adjust this based on how your authentication middleware sets userId
    console.log(id);
    console.log(updateTaskDto);
    console.log(userId);
    
    return await this.tasksService.update(id, updateTaskDto, userId);
  }
}
