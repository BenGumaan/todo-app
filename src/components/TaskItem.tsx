import React from "react";
import { Task } from "../models/Task";

interface TaskItemProps {
    task: Task;
    updateTaskStatus: (taskId: number, completed: boolean) => void;
    deleteTask: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, updateTaskStatus, deleteTask }) => {

  const handleStatusChange = (taskId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTaskStatus(taskId, e.target.checked);
  };

  return (
      <div className={`task-item ${task.completed ? 'completed' : ''}`}>
          <input 
            type="checkbox" 
            checked={task.completed}
            onChange={handleStatusChange(task.id)}
          />
          <span>{task.title}</span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
  );

}

export default TaskItem;