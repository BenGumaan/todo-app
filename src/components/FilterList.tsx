import React, { useState } from 'react';

const FilterList = () => {
    const [activeButton, setActiveButton] = useState('All'); // Default active button

    const buttons = ['All', 'Personal', 'Work', 'Grocery'];

    const handleButtonClick = (button: string) => {
        setActiveButton(prevButton => (prevButton === button ? '' : button)); // Toggle active state
    };

    return (
        <ul className='filter-list'>
            {buttons.map((button) => (
                <li key={button}>
                    <button
                        className={activeButton === button ? 'active' : ''}
                        onClick={() => handleButtonClick(button)}
                    >
                        {button}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default FilterList;