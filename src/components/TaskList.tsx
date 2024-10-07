import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../models/Task';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface TaskListProps {
    tasks: Task[];
    updateTaskStatus: (taskId: number, completed: boolean) => void;
    deleteTask: (taskId: number) => void;
    editTask: (taskId: number, taskTitle: string) => void;
    reorderTasks: (startIndex: number, endIndex: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTaskStatus, deleteTask, editTask, reorderTasks }) => {
    
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        reorderTasks(result.source.index, result.destination.index);
    };
   
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='taskList'>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => (
                            <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <TaskItem
                                            task={task}
                                            updateTaskStatus={updateTaskStatus}
                                            deleteTask={deleteTask}
                                            editTask={editTask}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};



export default React.memo(TaskList);
