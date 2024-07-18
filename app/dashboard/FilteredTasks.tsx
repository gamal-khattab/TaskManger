// src/app/dashboard/FilteredTasks.tsx
"use client"
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TaskList from '../components/Dashboard/TaskList';
import { Task } from '../types';
import { useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FilteredTasksProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
  }
  
 
  const FilteredTasks: React.FC<FilteredTasksProps> = ({ onEditTask, onDeleteTask }) => {
    const [tasks1,setTasks1] = useState([]);
    const user = useSelector((state: RootState) => state.auth.user);
  const [filter, setFilter] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAllCategory, setSelectedAllCategory] = useState([]);
  const filteredTasks = tasks.filter(task => task.category === selectedCategory);
  useEffect(() => {
    fetchTasks();
  }, [selectedCategory]);
  const handleDeleteTask = (taskId: string) => {
    setTasks1(tasks1.filter((task:any) => task._id !== taskId));
    toast.success("Done")
  };
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/tasks'); // Adjust API endpoint based on your backend setup
      console.log(response.data);
      const filtered = await (response.data).filter((e:any)=>e.userId===user?.email && e.category === selectedCategory)
      const filteredCategories = await (response.data).map((e:any)=> {return e.category})
      setSelectedAllCategory(filteredCategories)
      setTasks1(filtered)
      return filtered
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4">Filtered Tasks</h2>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">Select Category</option>
        {selectedAllCategory.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <TaskList onEditTask={onEditTask} onDeleteTask={handleDeleteTask} tasks={tasks1} />
    </div>
  );
};

export default FilteredTasks;
