// src/app/dashboard/CategorizedTasks.tsx
"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TaskList from '../components/Dashboard/TaskList';
import { Task } from '../types';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
interface CategorizedTasksProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
  }

  const CategorizedTasks: React.FC<CategorizedTasksProps> = ({  onEditTask, onDeleteTask }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [tasks,setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);
    const handleDeleteTask = (taskId: string) => {
      setTasks(tasks.filter((task:any) => task._id !== taskId));
    };
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/tasks'); // Adjust API endpoint based on your backend setup
      const filtered = await (response.data).filter((e:any)=>e.userId===user?.email)
      const filteredCategories = await (response.data).map((e:any)=> {return e.category})
      console.log(filteredCategories);
      const categoriesMap = await filteredCategories.map((category : any)=> { return filtered.filter((task:any) => task.category === category)})
      console.log(categoriesMap);
      setTasks(categoriesMap)

      return categoriesMap
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4">Categorized Tasks</h2>
        <div >
          <TaskList onEditTask={onEditTask} onDeleteTask={handleDeleteTask} tasks={tasks} />
        </div>
    </div>
  );
};

export default CategorizedTasks;









