import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './models/Task';
import useTasks from './hooks/useTasks';

const App: React.FC = () => {

  // Sample tasks data
  const sampleTasks: Task[] = [ 
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ];

  const { tasks, addTask, updateTaskStatus, deleteTask, editTask } = useTasks(sampleTasks);

  return (
    <div className='App'>
        <header>
            <h1>Todo App</h1>
        </header>
        <main>
            <h2>Tasks</h2>
            <TaskForm addTask={addTask}/>
            <TaskList 
              tasks={tasks} 
              updateTaskStatus={updateTaskStatus} 
              deleteTask={deleteTask}
              editTask={editTask}
            />
        </main>
    </div>
  );
};

export default App;