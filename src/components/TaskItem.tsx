import React, { useCallback, useEffect, useRef } from "react";
import { Task } from "../models/Task";

interface TaskItemProps {
    task: Task;
    updateTaskStatus: (taskId: number, completed: boolean) => void;
    deleteTask: (taskId: number) => void;
    editTask: (taskId: number, taskTitle: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, updateTaskStatus, deleteTask, editTask }) => {

  const [toggleEdit, setToggleEdit] = React.useState(false);
  const [newTaskTitle, setNewTaskTitle] = React.useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to handle delete task
  const handleDelete = useCallback((taskId: number) => {  
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  }, [deleteTask]);
  
  // Function to handle edit task
  const handleEdit = useCallback((taskId: number) => { 
    setToggleEdit(toggleEdit => !toggleEdit);
    if (toggleEdit) {
      editTask(taskId, newTaskTitle);
    }
  }, [editTask, newTaskTitle, toggleEdit]);

  // Function to handle task status change
  const handleStatusChange = useCallback((taskId: number, completed: boolean) => {
    updateTaskStatus(taskId, completed);
  }, [updateTaskStatus]);

  // Function to handle task title change
  const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  useEffect(() => {
    if (toggleEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleEdit]);

  return (
      <div className={`task-item ${task.completed ? 'completed' : ''}`}>
          <input 
            type="checkbox" 
            checked={task.completed}
            onChange={(e) => handleStatusChange(task.id, e.target.checked)}
            required
          />
          <input 
            type="text"
            value={newTaskTitle}
            onChange={handleTaskTitleChange} 
            disabled={!toggleEdit}
            ref={inputRef}
          />
          <button onClick={() => handleDelete(task.id)}>Delete</button>
          <button onClick={() => handleEdit(task.id)}>{toggleEdit ? 'Save' : 'Edit'}</button>
      </div>
  );

}

export default React.memo(TaskItem);