// src/app/dashboard/CompletedTasks.tsx
"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TaskList from '../components/Dashboard/TaskList';
import { Task } from '../types';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
interface CompletedTasksProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
  }

  const CompletedTasks: React.FC<CompletedTasksProps> = ({  onEditTask, onDeleteTask }) => {
    const [tasks1,setTasks1] = useState([]);
    const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks.filter(task => task.status === 'completed'));
  useEffect(() => {
    fetchTasks();
  }, []);
  const handleDeleteTask = (taskId: string) => {
    setTasks1(tasks1.filter((task:any) => task._id !== taskId));
  };
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/tasks'); 
      console.log(response.data);
      const filtered = await (response.data).filter((e:any)=>e.userId===user?.email && e.status=== "completed")
      setTasks1(filtered)
      return filtered
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
      <TaskList onEditTask={onEditTask} onDeleteTask={handleDeleteTask} tasks={tasks1} />
    </div>
  );
};

export default CompletedTasks;
