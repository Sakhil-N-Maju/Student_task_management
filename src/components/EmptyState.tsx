import React from 'react';

interface EmptyStateProps {
  type: 'no-tasks' | 'no-results';
  onActionClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onActionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white border border-dashed border-slate-300 rounded-xl min-h-[300px]">
      {type === 'no-tasks' ? (
        <>
          {/* Clipboard SVG */}
          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-950">No tasks scheduled</h3>
          <p className="text-slate-500 text-xs mt-1.5 max-w-xs leading-relaxed font-medium">
            Your task planner is empty. Create a task now to organize your homework, exams, and study hours.
          </p>
          <button
            onClick={onActionClick}
            className="mt-5 inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150"
          >
            Create Your First Task
          </button>
        </>
      ) : (
        <>
          {/* Search SVG */}
          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L22 22" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-950">No matches found</h3>
          <p className="text-slate-500 text-xs mt-1.5 max-w-xs leading-relaxed font-medium">
            We couldn't find any tasks matching your filters or search keywords. Try adjusting your settings.
          </p>
          <button
            onClick={onActionClick}
            className="mt-5 inline-flex items-center justify-center border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150"
          >
            Reset Filters &amp; Search
          </button>
        </>
      )}
    </div>
  );
};

export default EmptyState;
