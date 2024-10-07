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

  const { tasks, 
          addTask, 
          updateTaskStatus, 
          deleteTask, 
          editTask,
          reorderTasks,
          setSortCriteria, 
          setSearchQuery,
          totalTasks 
  } = useTasks(sampleTasks);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div className='App'>
        <header>
            <h1>Todo App</h1>
        </header>
        <main>
            <h2>Tasks</h2>
            <TaskForm addTask={addTask}/>
            <div>
              <label htmlFor="sort">Sort by: </label>
              <select id="sort" onChange={handleSortChange}>
                <option value="title">Title</option>
                <option value="completed">Completed</option>
                <option value="id">ID</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort">Search: </label>
              <input 
                type="text" 
                id="search"
                placeholder="Search tasks..."
                onChange={handleSearchChange} 
              />
            </div>
            <h3>Task List ({totalTasks})</h3>
            <TaskList 
              tasks={tasks} 
              updateTaskStatus={updateTaskStatus} 
              deleteTask={deleteTask}
              editTask={editTask}
              reorderTasks={reorderTasks}
            />
        </main>
    </div>
  );
};

export default App;