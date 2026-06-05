import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import type { Priority } from '../types/task';

const TaskForm: React.FC = () => {
  const { addTask, updateTask, editingTask, setEditingTask } = useTasks();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; description?: boolean }>({});

  // Sync with editing task when edit mode is toggled or task changes
  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setErrors({});
      setTouched({});
    } else {
      setName('');
      setDescription('');
      setPriority('Medium');
      setErrors({});
      setTouched({});
    }
  }, [editingTask]);

  // Validation function
  const validate = (fields: { name: string; description: string }) => {
    const newErrors: { name?: string; description?: string } = {};
    if (!fields.name.trim()) {
      newErrors.name = 'Task name is required';
    } else if (fields.name.length > 50) {
      newErrors.name = 'Task name must be under 50 characters';
    }
    
    if (!fields.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (fields.description.length > 250) {
      newErrors.description = 'Description must be under 250 characters';
    }
    
    return newErrors;
  };

  // Perform validation on change if touched
  useEffect(() => {
    if (touched.name || touched.description) {
      const validationErrors = validate({ name, description });
      setErrors({
        ...(touched.name ? { name: validationErrors.name } : {}),
        ...(touched.description ? { description: validationErrors.description } : {}),
      });
    }
  }, [name, description, touched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, description: true });
    
    const validationErrors = validate({ name, description });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, { name, description, priority });
    } else {
      addTask(name, description, priority);
    }

    // Reset Form
    setName('');
    setDescription('');
    setPriority('Medium');
    setErrors({});
    setTouched({});
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
      <h2 className="text-base font-bold tracking-tight text-slate-950 mb-6 flex items-center gap-2">
        {editingTask ? (
          <>
            <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse"></span>
            Edit Task
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-slate-900"></span>
            Create New Task
          </>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Task Name */}
        <div>
          <label htmlFor="task-name" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Task Name *
          </label>
          <input
            id="task-name"
            type="text"
            placeholder="e.g., Study for Algorithms Exam"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
            className={`w-full bg-white border ${
              errors.name ? 'border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-slate-900 focus:ring-slate-900/10'
            } rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-450 text-sm focus:outline-none focus:ring-4 transition-all duration-200`}
          />
          {errors.name && (
            <p className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1.5 animate-fade-in">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        {/* Task Description */}
        <div>
          <label htmlFor="task-description" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Description *
          </label>
          <textarea
            id="task-description"
            rows={4}
            placeholder="What needs to be done? Include notes or timelines."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
            className={`w-full bg-white border ${
              errors.description ? 'border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-slate-900 focus:ring-slate-900/10'
            } rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-450 text-sm focus:outline-none focus:ring-4 transition-all duration-200 resize-none`}
          />
          {errors.description && (
            <p className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1.5 animate-fade-in">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errors.description}
            </p>
          )}
        </div>

        {/* Priority Selection */}
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">
            Priority Level
          </span>
          <div className="bg-slate-100 border border-slate-200 p-1 rounded-xl flex gap-1">
            {(['Low', 'Medium', 'High'] as Priority[]).map((p) => {
              const isActive = priority === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-1.5 text-xs font-bold tracking-wide uppercase rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-slate-950 border border-slate-200 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg py-2.5 text-sm font-semibold transition-all duration-250"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-950 rounded-lg py-2.5 text-sm font-bold shadow-sm active:scale-[0.98] transition-all duration-200"
          >
            {editingTask ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
