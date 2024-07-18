import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    title?: string;
    description?: string;
    category?: string;
    status?: 'pending' | 'completed' | 'in-progress';
    userId?: string; // Add userId property here
}
