// TaskForm.tsx
import React from 'react';

const TaskForm: React.FC = () => {
    // component code
    return (
      <form>
        <input type="text" placeholder="Task title" />
        <button type="submit">Add task</button>
      </form>
    );
};
  
export default TaskForm;