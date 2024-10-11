import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './models/Task';
import useTasks from './hooks/useTasks';
import './App.css';
import FilterList from './components/FilterList';

const App: React.FC = () => {

  // Sample tasks data
  const sampleTasks: Task[] = [ 
    { id: 1, title: 'Task 1', completed: false, category: 'Personal', manualOrder: 0},
    { id: 2, title: 'Task 2', completed: true, category: 'Work', manualOrder: 1 },
    { id: 3, title: 'Task 3', completed: false, category: 'Grocery', manualOrder: 2 },
  ];

  const { tasks,
          addTask, 
          updateTaskStatus, 
          deleteTask, 
          editTask,
          reorderTasks,
          setSortCriteria, 
          setSearchQuery,
          setCategory,
          totalTasks 
  } = useTasks(sampleTasks);
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }

  const buttons = document.querySelectorAll<HTMLButtonElement>('.filter-list button');
  console.log("buttons: ", buttons);
  
  Array.from(buttons).forEach(button => {
    button.addEventListener('click', (e: MouseEvent) => {
      const target = e.currentTarget as HTMLButtonElement;
      target.classList.toggle('active');
    });
  });

  return (
    <div className='App'>
        <header>
            <h1>Todo App</h1>
        </header>
        <main>
            <h2>Tasks</h2>
            <TaskForm addTask={addTask}/>
            {/* <div>
              <label htmlFor="cat">Category: </label>
              <select id="cat" onChange={handleCategoryChange}>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="grocery">Grocery</option>
              </select>
            </div> */}
            <div>
              <label htmlFor="sort">Sort by: </label>
              <select id="sort" onChange={handleSortChange}>
                <option value="custom">Custom</option>
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
            <FilterList />
            <div>
              {/* <label htmlFor="cat">Show: </label>
              <ul className='filter-list'>
                <li><button className='active'>All</button></li>
                <li><button>Personal</button></li>
                <li><button>Work</button></li>
                <li><button>Grocery</button></li>
              </ul> */}
              <select id="cat" onChange={handleCategoryChange}>
                <option value="all">All</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="grocery">Grocery</option>
              </select>
            </div>
        </main>
    </div>
  );
};

export default App;