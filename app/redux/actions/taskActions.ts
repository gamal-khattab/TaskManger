// src/redux/actions/taskActions.ts

import { Dispatch } from 'redux';
import axios from 'axios';
import { deleteTask } from '../slices/taskSlice'; // Adjust import path as needed

export const deleteTaskAsync = (id: string) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`/tasks/${id}`);
    dispatch(deleteTask(id)); // Assuming deleteTask action removes the task from the state
  } catch (error) {
    console.error('Failed to delete task:', error);
    // Handle error or dispatch an error action if needed
  }
};
