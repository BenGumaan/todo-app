// Code for validating tasks 
import { Task } from '../models/Task'; // Import the Task interface from the models folder

// Validate a single task
export const validateTask = (task: Task): boolean => {
    return (
      typeof task.id === 'number' &&
      typeof task.title === 'string' &&
      task.title.trim() !== '' && // Check for empty strings
      typeof task.completed === 'boolean'
    );
  };
  
  // Validate an array of tasks
  export const validateTasks = (tasks: Task[]): boolean => {
    if (!Array.isArray(tasks)) {
      alert('Tasks should be an array.');
      throw new Error('Tasks should be an array.');
    }
    
    if (tasks.length === 0) {
      alert('Tasks array cannot be empty.');
      throw new Error('Tasks array cannot be empty.');
    }
  
    if (!tasks.every(validateTask)) {
      alert('Invalid task data: Missing properties or incorrect types.');
      throw new Error('Invalid task data: Missing properties or incorrect types.');
    }
  
    return true; // If all validations pass
  };
  