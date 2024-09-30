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
          setSortCriteria, 
          setSearchQuery, 
          currentPage, 
          setCurrentPage,
          tasksPerPage,
          setTasksPerPage,
          totalTasks 
  } = useTasks(sampleTasks);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const totalPages = Math.ceil(totalTasks / tasksPerPage);

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
            <div>
              <label htmlFor="taskPerPage">Show: </label>
              <select id="taskPerPage" onChange={(e) => setTasksPerPage(parseInt(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
              <span> tasks per page</span>
            </div>
            <div>
              <span>Page: {currentPage} of {totalPages}</span><br />
            </div>
            <TaskList 
              tasks={tasks} 
              updateTaskStatus={updateTaskStatus} 
              deleteTask={deleteTask}
              editTask={editTask}
            />
            { totalPages > 0 ? 
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button 
                    key={index + 1} 
                    onClick={() => handlePageChange(index + 1)} 
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                ))}
              </div> :
              <span>No tasks found</span>
            }
        </main>
    </div>
  );
};

export default App;