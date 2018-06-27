import React from 'react';
import './switch.css';

const Switch = ({ on = false, onClick = () => {} }) => (
    <label className="switch">
        <input type="checkbox" checked={on} onChange={() => {}} onClick={onClick} />
        <span className="slider round" />
    </label>
);

export default Switch;
