import React, { useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './models/Task';
import { validateTask, validateTasks } from './utils/taskValidation'; // Import validation functions

// Function to retrieve tasks from local storage
const getStoredTasks = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks');
  
  if (storedTasks) {
    try {
      const parsedTasks = JSON.parse(storedTasks);
      validateTasks(parsedTasks); // Validate the tasks
      return parsedTasks; // Valid tasks are returned
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      return []; // Return an empty array on error
    }
  }

  return []; // Return an empty array if no tasks are found
};

const App: React.FC = () => {

  // Sample tasks data
  const sampleTasks: Task[] = [ 
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ];

  // Memoized the getStoredTasks function
  const memoizedStoredTasks = React.useMemo(() => getStoredTasks(), []); // Memoize the stored tasks
  const [tasks, setTasks] = React.useState<Task[]>(memoizedStoredTasks.length > 0 ? memoizedStoredTasks : sampleTasks); // Initialize tasks with stored tasks or sample tasks if no tasks are stored 

  // Function to add a new task
  const addTask = (taskTitle: string) => {
    // Handle task submission logic
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      title: taskTitle,
      completed: false,
    };
    if (!validateTask(newTask)) {
      alert('Invalid task data');
      return;  // Exit the function if the task data is invalid
    }
    setTasks([...tasks, newTask]);
  };

  // Function to update the task status
  const updateTaskStatus = (taskId: number, completed: boolean) => {
    // Update task status using the ternary operator and the spread operator in the map method 
    setTasks(tasks.map((task: Task) => 
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  // Function to delete a task
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task: Task) => task.id !== taskId));
  };

  // Update local storage when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.removeItem('tasks'); //Remove tasks from local storage if the array is empty.
    }
  }, [tasks]);

  return (
    <div className='App'>
        <header>
            <h1>Todo App</h1>
        </header>
        <main>
            <h2>Tasks</h2>
            <TaskForm addTask={addTask}/>
            <TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask}/>
        </main>
    </div>
  );
};

export default App;