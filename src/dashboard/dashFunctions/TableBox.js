// src/dashboard/dashFunctions/TableBox.js

import React from 'react';
import './TableBox.css';  // Import the CSS


const TableBox = ({ table, onSelect }) => {
    return (
        <div className="table-box" onClick={onSelect}>
            <p>{table.name}</p>
        </div>
    );
};

export default TableBox;
