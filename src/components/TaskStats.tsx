import React from 'react';
import { useTasks } from '../context/TaskContext';

const TaskStats: React.FC = () => {
  const { tasks } = useTasks();
  
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Pending priorities
  const highPending = tasks.filter((t) => t.priority === 'High' && t.status === 'Pending').length;
  const medPending = tasks.filter((t) => t.priority === 'Medium' && t.status === 'Pending').length;
  const lowPending = tasks.filter((t) => t.priority === 'Low' && t.status === 'Pending').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Tasks Card */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl">
        <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Total Tasks</p>
        <div className="flex items-baseline space-x-1.5 mt-2">
          <span className="text-3xl font-bold tracking-tight text-slate-950">{total}</span>
          <span className="text-xs text-slate-500 font-normal">registered</span>
        </div>
      </div>

      {/* Completion Progress Card */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl">
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Completion Rate</p>
          <span className="text-[10px] font-bold text-slate-850 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{percentage}%</span>
        </div>
        <div className="mt-2.5">
          <div className="text-3xl font-bold tracking-tight text-slate-950">{completed}</div>
          <div className="w-full bg-slate-100 border border-slate-200/60 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-slate-900 h-full rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Pending Tasks Card */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl">
        <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Pending Tasks</p>
        <div className="flex items-baseline space-x-1.5 mt-2">
          <span className="text-3xl font-bold tracking-tight text-slate-950">{pending}</span>
          <span className="text-xs text-slate-500 font-normal">to complete</span>
        </div>
      </div>

      {/* Priority Breakdown Card */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl">
        <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-3">Pending Priorities</p>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs text-slate-700">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-slate-400 mr-2"></span> High
            </span>
            <span className="font-semibold text-slate-950 bg-slate-50 border border-slate-200 px-2 py-0.2 rounded">{highPending}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-700">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-slate-300 mr-2"></span> Medium
            </span>
            <span className="font-semibold text-slate-950 bg-slate-50 border border-slate-200 px-2 py-0.2 rounded">{medPending}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-700">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-slate-200 mr-2"></span> Low
            </span>
            <span className="font-semibold text-slate-950 bg-slate-50 border border-slate-200 px-2 py-0.2 rounded">{lowPending}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
