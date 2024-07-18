// src/components/TaskList.tsx
import React from 'react';
import { Task } from '../../types'; // Ensure consistent type import
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onMarkTask: (taskId: string) => void;
}

// const updateTaskAsync = async (id: string, updateTaskDto: any) => {
//   try {
//     const response = await axios.patch(`/tasks/${id}`, updateTaskDto);
//   } catch (error) {
//     // Handle error
//     console.error('Failed to update task:', error);
//   }
// };

// Function to delete a task
// Function to delete a task
const deleteTaskAsync = async (id: string, onDeleteTask: (id: string) => void) => {
  try {
    await axios.delete(`http://localhost:4000/tasks/${id}`);
    onDeleteTask(id);
    toast.success("Done")
  } catch (error) {
    // Handle error
    console.error('Failed to delete task:', error);
  }
};


const TaskListComp: React.FC<TaskListProps> = ({ tasks , onEditTask, onDeleteTask }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const deleteUpdateAsync = async (id: string, onMarkTask: (id: string) => void) => {
    try {
        console.log("asssssssssssssssssssssss");
      await axios.patch(`http://localhost:4000/tasks/${id}/completed`,user);

      toast.success("Done")
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");

      onDeleteTask(id);
    } catch (error) {
        console.log("sssssssssssaaaaaaaaaaaaaaaaaaawwwwwwwwwwwww");

      // Handle error
      console.error('Failed to delete task:', error);
    }
  };
  const [title, setTitle] = useState('');
const [status, setStatus] = useState<'completed' | 'pending' | 'in-progress'>('pending');
const [category, setCategory] = useState('');
const [description, setDescription] = useState('');
  return (
    <div className="min-h-screen bg-gray-100 p-4">
    {tasks.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task:any) => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-2">
              <span className="font-semibold">Title:</span> {task.title}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Description:</span> {task.description}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Category:</span> {task.category}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status:</span> {task.status}
            </div>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => onEditTask(task)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTaskAsync(task._id,onDeleteTask)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => deleteUpdateAsync(task._id,onDeleteTask)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Completed
              </button>
            </div>
          </div>
        ))}
           <Toaster position="bottom-center" />
      </div>
    ) : (
      <p className="text-center text-gray-500">No tasks available.</p>
    )}
  </div>
  );
};

export default TaskListComp;
