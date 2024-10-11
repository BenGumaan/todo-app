import React, { useState } from 'react';

interface TaskFormProps {
    addTask: (taskTitle: string, category: string) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('personal');
    
    const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskTitle.trim()){
          addTask(taskTitle, category);
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
        <div>
          <label htmlFor="cat">Category: </label>
          <select id="cat" onChange={handleCategoryChange}>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>
        <button type="submit">Add task</button>
      </form>
    );
};
  
export default React.memo(TaskForm);