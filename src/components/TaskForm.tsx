import React, { useState } from 'react';

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
        if (taskTitle.trim()){
          addTask(taskTitle);
          setTaskTitle('');
        } else {
          alert('Please enter a task title');
        }
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
  
export default React.memo(TaskForm);