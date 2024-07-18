import { IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  title: string;
  description: string;
  category: string;
  dueDate: Date; // Example: Assuming due date is required for task creation
  userId?: string; // Add userId property here
}
