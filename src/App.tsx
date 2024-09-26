import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};