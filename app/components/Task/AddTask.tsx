// src/app/components/Task/AddTask.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/slices/taskSlice';
import { Task } from '../../types';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';
interface AddTaskProps {
  onAddTask: (newTask: Task) => void;
}
const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'completed' | 'pending' | 'in-progress'>('pending');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  console.log(user);
  const handleAddTask = async () => {
    const newTask: Task = {
      userId: user ? user.email : "",
      title,
      status: status,
      category,
      description
    };

    try {
      const response = await axios.post('http://localhost:4000/tasks', newTask); 
 
      
      dispatch(addTask(response.data)); 
      toast.success("Task is added");
      // Clear form fields after successful submission
      setTitle('');
      setStatus('pending');
      setCategory('');
      setDescription('');

      if (onAddTask) {
        onAddTask(response.data);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }

    dispatch(addTask(newTask));
    setTitle('');
    setStatus('pending');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Add Task</h2>
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
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default AddTask;
