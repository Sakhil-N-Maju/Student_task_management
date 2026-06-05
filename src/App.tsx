import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskStats from './components/TaskStats';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

const DashboardContent: React.FC = () => {
  // Local state for searching & filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Pending'>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col">
      {/* Header section */}
      <Header />

      {/* Stats overview dashboard */}
      <TaskStats />

      {/* Responsive layout: Grid on desktop, Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start flex-1">
        {/* Form area: 1 Column width on desktop */}
        <div className="lg:col-span-1 lg:sticky lg:top-6">
          <TaskForm />
        </div>

        {/* Filter and Task Listing: 2 Columns width on desktop */}
        <div className="lg:col-span-2 space-y-6">
          <TaskFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
          <TaskList
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Simple Academic branding footer */}
      <footer className="mt-16 pt-6 border-t border-slate-200 text-center text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
        AcademiaTask &copy; {new Date().getFullYear()} &bull; Designed for Student Productivity
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
};

export default App;
