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
  const [sortCriteria, setSortCriteria] = useState<string>('title'); // Default sorting by title
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state

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

  // Filter tasks based on search query and sort criteria
  const filteredAndSortedTasks = useMemo(() => {
    const filteredTasks = tasks.filter((task: Task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return filteredTasks.sort((a, b) => {
      if (sortCriteria === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortCriteria === 'completed') {
        return Number(a.completed) - Number(b.completed);
      } else if (sortCriteria === 'id') {
        return a.id - b.id;
      }
      return 0;
    });
  },  [tasks, sortCriteria, searchQuery]);
  
  // Update local storage when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.removeItem('tasks');
    }
  }, [tasks]);

  return { tasks: filteredAndSortedTasks, addTask, updateTaskStatus, deleteTask, editTask, setSortCriteria, setSearchQuery };
};

export default useTasks;