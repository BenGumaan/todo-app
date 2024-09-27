import { useState, useEffect, useMemo, useCallback } from 'react';
import { Task } from '../models/Task';
import { validateTask, validateTasks } from '../utils/taskValidation'; // Import validation functions

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
        return [];
      }
    }
  
    return [];
  };

const useTasks = (initialTasks: Task[]) => {
  // Memoized the getStoredTasks function
  const memoizedStoredTasks = useMemo(() => getStoredTasks(), []);
  const [tasks, setTasks] = useState<Task[]>(memoizedStoredTasks.length > 0 ? memoizedStoredTasks : initialTasks); // Initialize tasks with stored tasks or sample tasks if no tasks are stored 

  // Function to add a new task
  const addTask = useCallback((taskTitle: string) => {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      title: taskTitle,
      completed: false,
    };
    if (!validateTask(newTask)) {
      alert('Invalid task data');
      return;
    }
    setTasks(tasks => [...tasks, newTask]);
  }, []);

   // Function to update the task status
   const updateTaskStatus = useCallback((taskId: number, completed: boolean) => {
    setTasks(tasks => tasks.map((task: Task) => 
      task.id === taskId ? { ...task, completed } : task
    ));
  }, []);

  // Function to delete a task
  const deleteTask = useCallback((taskId: number) => {
    setTasks(tasks => tasks.filter((task: Task) => task.id !== taskId));
  }, []);

  // Function to edit a task
  const editTask = useCallback((taskId: number, taskTitle: string) => {
    if (taskTitle) {
      setTasks(tasks => tasks.map(task => 
        task.id === taskId ? { ...task, title: taskTitle } : task
      ));
    }
  }, []);

  // Update local storage when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.removeItem('tasks');
    }
  }, [tasks]);

  return { tasks, addTask, updateTaskStatus, deleteTask, editTask };
};

export default useTasks;