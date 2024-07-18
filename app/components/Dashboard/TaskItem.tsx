// src/app/dashboard/components/TaskItem.tsx
import React from 'react';
import { Task } from '../../redux/slices/taskSlice';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="mb-4 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
    </div>
  );
};

export default TaskItem;
