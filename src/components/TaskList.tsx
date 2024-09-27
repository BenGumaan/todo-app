import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../models/Task';

interface TaskListProps {
    tasks: Task[];
    updateTaskStatus: (taskId: number, completed: boolean) => void;
    deleteTask: (taskId: number) => void;
    editTask: (taskId: number, taskTitle: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTaskStatus, deleteTask, editTask }) => {
    return (
        <div className='task-list'>
            {tasks.map((task: Task) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  updateTaskStatus={updateTaskStatus} 
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
            ))}
        </div>
    );
};



export default React.memo(TaskList);
