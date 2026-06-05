export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Completed' | 'Pending';

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
}
