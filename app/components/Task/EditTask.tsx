// src/app/components/Task/EditTask.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../../types';
import { updateTask } from '../../redux/slices/taskSlice';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
interface EditTaskProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task }) => {
  console.log(task);
  const id = task._id
  console.log(id);
  
  
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState<'completed' | 'pending' | 'in-progress'>(task.status);
  const [category, setCategory] = useState(task.category);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setTitle(task.title);
    setStatus(task.status);
    setCategory(task.category);
    setDescription(task.description);
  }, [task]);

  const handleUpdateTask = async () => {
    const updatedTask: Task = {
      ...task,
      title,
      status,
      category,
      description,
    };
    console.log(updateTask);
    
    try {
       await axios.patch(`http://localhost:4000/tasks/${id}`, updatedTask); 
      
      toast.success("Task is eited");
      setTitle('');
      setStatus('pending');
      setCategory('');
      setDescription('');

  
    } catch (error) {
      console.error('Error adding task:', error);
    }
    setTitle('');
    setStatus('pending');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Edit Task</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'completed' | 'pending' | 'in-progress')}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        onClick={handleUpdateTask}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Task
      </button>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default EditTask;
