import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-200 px-1 py-5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 border border-slate-900 rounded-lg flex items-center justify-center bg-white">
            <svg 
              className="w-5 h-5 text-slate-900" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 m-0">
              AcademiaTask
            </h1>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Student Workspace &amp; Personal Planner
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 self-start sm:self-center">
          <span className="text-[10px] font-bold tracking-wide uppercase text-slate-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
            Active Semester
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
