import React from 'react';

interface TaskFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: 'All' | 'Completed' | 'Pending';
  setStatusFilter: (status: 'All' | 'Completed' | 'Pending') => void;
  priorityFilter: 'All' | 'Low' | 'Medium' | 'High';
  setPriorityFilter: (priority: 'All' | 'Low' | 'Medium' | 'High') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-10 py-3 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-650 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Status Filter */}
        <div className="flex-1 bg-slate-100 border border-slate-200 p-1 rounded-xl flex gap-1">
          {(['All', 'Pending', 'Completed'] as const).map((status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-slate-950 border border-slate-200 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Priority Filter */}
        <div className="flex-1 bg-slate-100 border border-slate-200 p-1 rounded-xl flex gap-1">
          {(['All', 'Low', 'Medium', 'High'] as const).map((priority) => {
            const isActive = priorityFilter === priority;
            return (
              <button
                key={priority}
                onClick={() => setPriorityFilter(priority)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-slate-950 border border-slate-200 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {priority}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
