// src/dashboard/WaiterDashboard.js

import React, { useState, useEffect } from 'react';
import { TableBox } from './dashFunctions/TableBox.js';
import { OrderManager } from './dashFunctions/OrderManager.js';
import './css/WaiterDashboard.css';  // Import the CSS

const WaiterDashboard = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        // Fetch the tables assigned to the waiter from the backend
        fetchAssignedTables();
    }, []);

    const fetchAssignedTables = async () => {
        // Assume there's an API endpoint to get the tables assigned to the logged-in waiter
        try {
            const response = await fetch('/api/tables');
            const data = await response.json();
            setTables(data.tables);
        } catch (error) {
            console.error('Error fetching assigned tables:', error);
        }
    };

    return (
        <div className="waiter-dashboard">
            <h1>Welcome, {localStorage.getItem('userName')}!</h1>
            <div className="tables-grid">
                {tables.map((table, index) => (
                    <TableBox
                        key={index}
                        table={table}
                        onSelect={() => setSelectedTable(table)}
                    />
                ))}
            </div>
            {selectedTable && <OrderManager table={selectedTable} />}
        </div>
    );
};

export default WaiterDashboard;
