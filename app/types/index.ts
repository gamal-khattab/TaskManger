// src/types/index.ts

export interface Task {
  [x: string]: any;
  userId: string;
  title: string;
  status: 'completed' | 'pending' | 'in-progress'; // Add 'status' property
  category: string;
  description: string; // Any other optional properties
}
