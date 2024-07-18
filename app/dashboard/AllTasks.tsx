// src/app/dashboard/AllTasks.tsx
"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TaskList from '../components/Dashboard/TaskList';
import { Task } from '../types';
import axios from 'axios';
import { useEffect } from 'react';
import TaskListComp from '../components/Dashboard/CompletedTaskList';
interface AllTasksProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
  }
 

  const AllTasks: React.FC<AllTasksProps> = ({ onEditTask, onDeleteTask })=> {
    const [tasks,setTasks] = useState([]);
    const user = useSelector((state: RootState) => state.auth.user);

    const dispatch = useDispatch();
    useEffect(() => {
      fetchTasks();
    }, []);
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/tasks'); // Adjust API endpoint based on your backend setup
        console.log(response.data);
        const filtered = await (response.data).filter((e:any)=>e.userId===user?.email  && e.status !== "completed")
        setTasks(filtered)
        return filtered
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    console.log(fetchTasks);
    const handleDeleteTask = (taskId: string) => {
      console.log("------------------------------------------------------");
      setTasks(tasks.filter((task:any) => task._id !== taskId));
    };
    const handleMarkTask = async (taskId: string) => {

      console.log("888888888888888888888888888888888888888888888888888");

      try {
       
        await axios.patch(`http://localhost:4000/${taskId}/completed`,user); 
        console.log("FilteredTask");
        setTasks(tasks.filter((task:any) => task._id !== taskId));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
  
    };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
      <TaskListComp onEditTask={onEditTask} onDeleteTask={handleDeleteTask} tasks={tasks} onMarkTask={handleMarkTask} />
    </div>
  );
};

export default AllTasks;
