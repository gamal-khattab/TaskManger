import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
 
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    console.log("11111dsadas");
    return createdTask.save();
  }
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
  async findOneByUserId(id: string, userId: string): Promise<Task | null> {
    console.log("11111");
    
    return this.taskModel.findOne({ _id: id, userId }).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task | null> {
    const updatedTask = await this.taskModel
      .findOneAndUpdate(
        { _id: id, userId },
        { $set: updateTaskDto },
        { new: true, runValidators: true }
      )
      .exec();

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found for user ${userId}`);
    }

    // Ensure userId is not changed in update (optional)
    if (updateTaskDto.userId && updateTaskDto.userId !== userId) {
      throw new BadRequestException(`Cannot change userId in update`);
    }

    return updatedTask;
  }

  async updateStatus(id: string, userId: string): Promise<Task| null> {
    const updatedTask = await this.taskModel
      .findOneAndUpdate(
        { _id: id, userId },
        { status:"completed" },
        { new: true, runValidators: true }
      )
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found for user ${userId}`);
    }
    console.log(updatedTask);
    
    
    return  updatedTask;
  }

  async delete(id: string, userId: string): Promise<Task | null> {
    const deletedTask = await this.taskModel.findByIdAndDelete({ _id: id, userId }).exec();
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${id} not found for user ${userId}`);
    }
    return deletedTask;
  }
}
