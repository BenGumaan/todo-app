// TaskForm.tsx
import React, { useEffect, useState } from 'react';
// import { Task } from '../models/Task';

interface TaskFormProps {
    addTask: (taskTitle: string) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    
    const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle task submission logic here
        addTask(taskTitle);
        console.log('Task submitted:', taskTitle);
        // Optionally, reset the form
        setTaskTitle('');
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={taskTitle} 
          onChange={handleTaskTitleChange} 
          placeholder="Enter task title" 
        />
        <button type="submit">Add task</button>
      </form>
    );
};
  
export default TaskForm;