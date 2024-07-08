import React from 'react';
import '../css/filter.css';

const Filter = ({ title, options, selected, onChange }) => {
    return (
        <div className="filter-container">
            <h4>{title}</h4>
            <select value={selected} onChange={(e) => onChange(e.target.value)}>
                <option value="">All</option>
                {options && options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
