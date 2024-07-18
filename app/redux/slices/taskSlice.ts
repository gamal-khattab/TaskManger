import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
export interface Task {
  userId: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'completed' |  'in-progress';
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(task => task.userId === action.payload.userId);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.userId !== action.payload);
    },
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
