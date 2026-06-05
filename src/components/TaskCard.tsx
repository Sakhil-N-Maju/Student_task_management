import React from 'react';
import type { Task } from '../types/task';
import { useTasks } from '../context/TaskContext';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTaskStatus, deleteTask, editingTask, setEditingTask } = useTasks();

  const isCompleted = task.status === 'Completed';
  const isBeingEdited = editingTask?.id === task.id;

  // Formatting date nicely
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.name}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      className={`group relative bg-white border ${
        isBeingEdited
          ? 'border-slate-900 ring-1 ring-slate-900/5 bg-slate-50'
          : isCompleted
          ? 'border-slate-200/60 opacity-60'
          : 'border-slate-200 hover:border-slate-400'
      } p-5 rounded-xl transition-all duration-200`}
    >
      <div className="flex items-start gap-4">
        {/* Toggle Status Checkbox */}
        <button
          onClick={() => toggleTaskStatus(task.id)}
          className={`mt-1 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-4 ${
            isCompleted
              ? 'bg-slate-900 border-slate-900 text-white ring-slate-900/10'
              : 'border-slate-350 hover:border-slate-900 bg-white ring-slate-100'
          }`}
          aria-label={isCompleted ? 'Mark task as pending' : 'Mark task as completed'}
        >
          {isCompleted && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Task Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 text-slate-600 bg-slate-50 tracking-wider uppercase">
              {task.priority} Priority
            </span>
            <span className="text-[9px] text-slate-450 font-semibold uppercase">
              {formatDate(task.createdAt)}
            </span>
          </div>

          <h3
            className={`text-sm sm:text-base font-bold tracking-tight text-slate-950 mt-2 break-words transition-all duration-150 ${
              isCompleted ? 'line-through text-slate-400 decoration-slate-400 font-medium' : ''
            }`}
          >
            {task.name}
          </h3>

          <p
            className={`text-xs text-slate-600 mt-1 leading-relaxed break-words font-medium ${
              isCompleted ? 'line-through text-slate-400 decoration-slate-400' : ''
            }`}
          >
            {task.description}
          </p>
        </div>

        {/* Actions Menu */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => setEditingTask(task)}
            disabled={isCompleted}
            className={`p-1.5 rounded border text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all duration-150 ${
              isCompleted
                ? 'opacity-30 cursor-not-allowed border-transparent'
                : 'bg-white border-slate-200'
            }`}
            title="Edit Task"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          
          <button
            onClick={handleDelete}
            className="p-1.5 rounded bg-white border border-slate-200 hover:border-red-400 text-slate-500 hover:text-red-650 transition-all duration-150"
            title="Delete Task"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
