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
  const [sortCriteria, setSortCriteria] = useState<string>('custom'); // Default sorting by title
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
  const [category, setCategory] = useState<string>('all'); // Search query state

  // Add manual order field if it doesn't exist in tasks
  useEffect(() => {
    setTasks(tasks => tasks.map((task, index) => ({ ...task, manualOrder: task.manualOrder ?? index })));
  }, []);

  // Function to add a new task
  const addTask = useCallback((taskTitle: string, category: string) => {
    console.log("category:", category);
    
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      title: taskTitle,
      completed: false,
      category,
      manualOrder: tasks.length,  // Initialize new tasks at the end of the current order
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
  const filterByCategory = useMemo(() => {
    return tasks.filter(task => {
      if (category === 'all') {
        return true;
      }
      return task.category === category;
    });
  },  [tasks, category, searchQuery]);
  
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
      // Sort by manual order if no criteria is selected
      // Default sort by manual order
      return a.manualOrder - b.manualOrder;
    });
  },  [tasks, sortCriteria, searchQuery]);
  
  // Function to reorder tasks
  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    const result = Array.from(tasks); // Use the original tasks array
    const [removed] = result.splice(startIndex, 1); // Remove the task from the start index
    result.splice(endIndex, 0, removed); // Insert it at the new index     
    
    // Update manualOrder for each task
    const updatedTasks = result.map((task, index) => ({...task, manualOrder: index}));
    setTasks(updatedTasks); // Update the tasks state
  }, [tasks]);

  // Update local storage when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.removeItem('tasks');
    }
  }, [tasks]);

  return { 
    tasks: filterByCategory, 
    addTask, 
    updateTaskStatus, 
    deleteTask, 
    editTask,
    reorderTasks,
    setSortCriteria, 
    setSearchQuery,
    setCategory,
    totalTasks: filteredAndSortedTasks.length,
  };
};

export default useTasks;
