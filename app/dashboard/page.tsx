"use client"  
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import LoadingIndicator from './LoadingIndicator';
import { logout } from '../redux/slices/authSlice';
import CompletedTasks from './CompletedTasks';
import AllTasks from './AllTasks';
import CategorizedTasks from './CategorizedTasks';
import FilteredTasks from './FilteredTasks';
import AddTask from '../components/Task/AddTask';
import EditTask from '../components/Task/EditTask';
import { Task } from '../types'; // Adjust path as necessary
import { addTask, updateTask, deleteTask } from '../redux/slices/taskSlice';
import Profile from './Scraber';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [activeComponent, setActiveComponent] = useState('all-tasks');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    console.log('User:', user);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <LoadingIndicator />;
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setActiveComponent('edit-task');
  };

  const handleUpdateTask = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
    setEditingTask(null);
    setActiveComponent('all-tasks');
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleAddTask = (newTask: Task) => {
    dispatch(addTask(newTask));
    setActiveComponent('all-tasks');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'completed-tasks':
        return <CompletedTasks tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />;
      case 'all-tasks':
        return <AllTasks tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />;
      case 'categorized-tasks':
        return <CategorizedTasks tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />;
      case 'scrab':
        return <Profile />;
      case 'filtered-tasks':
        return <FilteredTasks tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />;
      case 'add-task':
        return <AddTask onAddTask={handleAddTask} />;
      case 'edit-task':
        return editingTask && <EditTask task={editingTask} onUpdateTask={handleUpdateTask} />;
      default:
        return <AllTasks tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100  flex-col md:flex-row">
      <aside className="md:w-64 bg-white shadow-md w-full	text-center  md:text-left">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <nav>
            <ul>
            <li className="mb-2">
                <button onClick={() => setActiveComponent('all-tasks')} className="text-blue-500 hover:underline">
                  All Tasks
                </button>
              </li>
              <li className="mb-2">
                <button onClick={() => setActiveComponent('completed-tasks')} className="text-blue-500 hover:underline">
                  Completed Tasks
                </button>
              </li>
              <li className="mb-2">
                <button onClick={() => setActiveComponent('filtered-tasks')} className="text-blue-500 hover:underline">
                  Filtered Categorized Tasks
                </button>
              </li>
               <li className="mb-2">
                <button onClick={() => setActiveComponent("scrab")} className="text-blue-500 hover:underline">
                  Scrab Profile Linked-In
                </button>
                </li>
                <li className="mb-2">
                <button onClick={() => setActiveComponent("add-task")} className="text-green-500 hover:underline">
                  Add Task
                </button>
                </li>
            </ul>
          </nav>
          <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome, {user.username}!</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {renderComponent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
