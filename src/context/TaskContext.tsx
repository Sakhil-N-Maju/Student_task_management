import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Task, Priority } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (name: string, description: string, priority: Priority) => void;
  updateTask: (id: string, updatedFields: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('student_tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Failed to parse tasks from localStorage', error);
      return [];
    }
  });

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Sync tasks to Local Storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('student_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string, description: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      priority,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const updateTask = (id: string, updatedFields: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
    // If the currently edited task is the one being updated, clear edit mode
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        editingTask,
        setEditingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
