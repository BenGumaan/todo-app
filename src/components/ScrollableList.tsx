import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Task } from '../models/Task';

interface ScrollableListProps {
    tasks: Task[];
    height: number;
    itemSize: number;
}

const ScrollableList: React.FC<ScrollableListProps> = ({ tasks, height, itemSize }) => {

    return (    
        <List
            height={height}
            itemCount={tasks.length}
            itemSize={itemSize}
            width="100%"
        >
        {({ index, style } : { index: number, style: React.CSSProperties }) => (
            <div style={style}>
                <div>{tasks[index].title}</div>
            </div>
        )}
        </List>
    );
};

export default ScrollableList;