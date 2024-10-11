import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Task } from '../models/Task';
import TaskList from './TaskList';
// import { Draggable } from '@hello-pangea/dnd';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface ScrollableListProps {
    tasks: Task[];
    height: number;
    itemSize: number;
}

const ScrollableList: React.FC<ScrollableListProps> = ({ tasks, height, itemSize }) => {

    function updateTaskStatus(taskId: number, completed: boolean): void {
        throw new Error('Function not implemented.');
    }

    function deleteTask(taskId: number): void {
        throw new Error('Function not implemented.');
    }

    function editTask(taskId: number, taskTitle: string): void {
        throw new Error('Function not implemented.');
    }

    function reorderTasks(startIndex: number, endIndex: number): void {
        throw new Error('Function not implemented.');
    }

    const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => (
        <Draggable draggableId={tasks[index].id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        ...style,
                        padding: '10px',
                        margin: '5px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                >
                    {tasks[index].id.toString()}
                </div>
            )}
        </Draggable>
    );
    
    return (
        <DndProvider backend={HTML5Backend}>
            <Droppable droppableId="droppable" direction="vertical">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc' }}
                    >
                        <List
                            height={400}
                            itemCount={items.length}
                            itemSize={50}
                            width={300}
                        >
                            {Row}
                        </List>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DndProvider>
    );
};

export default ScrollableList;