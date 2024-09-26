import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './models/Task';

const App: React.FC = () => {

  // Sample tasks data
  const sampleTasks: Task[] = [ 
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ];

  // State to store the tasks
  const [tasks, setTasks] = React.useState<Task[]>(sampleTasks);

  // Function to add a new task
  const addtask = (taskTitle: string) => {
    // Handle task submission logic
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      title: taskTitle,
      completed: false,
    };
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

  return (
    <div className='App'>
        <header>
            <h1>Todo App</h1>
        </header>
        <main>
            <h2>Tasks</h2>
            <TaskForm addTask={addtask}/>
            <TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask}/>
        </main>
    </div>
  );
};

export default App;