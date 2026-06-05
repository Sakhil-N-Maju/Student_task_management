import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

interface TaskListProps {
  searchQuery: string;
  statusFilter: 'All' | 'Completed' | 'Pending';
  priorityFilter: 'All' | 'Low' | 'Medium' | 'High';
  onResetFilters: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  searchQuery,
  statusFilter,
  priorityFilter,
  onResetFilters,
}) => {
  const { tasks } = useTasks();

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    // 1. Search Query filter (matches name or description)
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Status filter
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;

    // 3. Priority filter
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Decide what empty state to show, if any
  if (tasks.length === 0) {
    return (
      <EmptyState
        type="no-tasks"
        onActionClick={() => {
          // Focus the input field if exists, or do a callback
          const nameInput = document.getElementById('task-name');
          if (nameInput) nameInput.focus();
        }}
      />
    );
  }

  if (filteredTasks.length === 0) {
    return <EmptyState type="no-results" onActionClick={onResetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 animate-fade-in">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
