# AcademiaTask - Student Task Manager

A clean, minimalist, pure-white Student Task Manager built with **React**, **TypeScript**, and **Tailwind CSS v3**. Designed to be highly structured and easy to read, this application implements complete task CRUD operations, real-time search, status tabs, and persistent local storage.

---

## 🎨 Design Philosophy: Minimalist Pure White
This application follows a print-style, high-contrast monochrome design that avoids saturated colors and artificial glowing drops:
- **Absolute White Background**: The layout is set to a solid pure white (`#ffffff`).
- **Monochrome Typography**: Heavy focus on stark black and dark grey texts (`text-slate-950` / `text-slate-900`) for premium legibility.
- **Outline Elements**: Metric cards and panels are styled with thin slate borders (`border-slate-200`) and subtle grey accents.
- **Clean Action Items**: Buttons and active selectors utilize solid black borders and backgrounds, keeping interactions simple and direct.

---

## ✨ Features Implemented
1. **Create Task**: Create new tasks with a Title, Description, and Priority Level (Low, Medium, High).
2. **Read Tasks**: Clear cards displaying name, description, timestamps, and priority outlines.
3. **Update Task**: Edit existing task details dynamically by loading them back into the creation form.
4. **Delete Task**: Safe item deletion with browser confirm dialog checks.
5. **Task Status Toggle**: Mark tasks as Completed or Pending with single clicks, applying line-through styles on text.
6. **Dynamic Filters**: Filter tasks instantly by status (All, Pending, Completed) and priority (All, Low, Medium, High).
7. **Real-time Search**: Search tasks instantly by name or description.
8. **Stats Overview**: Dashboard showing total registered tasks, completion rate metric with a grey progress bar, pending counts, and priority status metrics.
9. **LocalStorage Sync**: Data automatically synchronizes on changes and persists across page reloads.

---

## 🏗️ Architecture & Component Files
- **State Management**:
  - `src/types/task.ts`: Holds type structures.
  - `src/context/TaskContext.tsx`: Manages React Context state and local storage effects.
- **UI Components**:
  - `src/components/Header.tsx`: Clean workspace branding header.
  - `src/components/TaskStats.tsx`: Dashboard statistics panel.
  - `src/components/TaskForm.tsx`: Dual-mode form with error validation.
  - `src/components/TaskFilter.tsx`: Search input and filter tabs.
  - `src/components/TaskList.tsx`: Coordinates items mapping and filter filters.
  - `src/components/TaskCard.tsx`: Task item card with checkbox and action buttons.
  - `src/components/EmptyState.tsx`: Visual placeholder for empty layouts.

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 2. Install Dependencies
Clone the repository and run the installation script in your terminal:
```bash
npm install
```

### 3. Start Development Server
Run the local Vite server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` to view the application.

### 4. Build for Production
Create the production bundle check:
```bash
npm run build
```

---

## 📚 Educational Documentation
For detailed explanations of the React concepts used (like `useState`, `useEffect`, `useContext`, Props, and Functional Components) and answers to the assignment questions, please check:
* **[documentation.md](./documentation.md)**
