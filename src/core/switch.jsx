import React from 'react';
import './switch.css';

const Switch = ({ on = false, onChange = () => {} }) => (
    <label className="switch">
        <input type="checkbox" checked={on} onChange={onChange} />
        <span className="slider round" />
    </label>
);

export default Switch;
