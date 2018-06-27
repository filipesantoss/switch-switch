import React from 'react';
import { Link } from 'react-router-dom';
import * as Links from './links';

const Header = () => (
    <div>
        <Link to={Links.SWITCH.path}>{Links.SWITCH.text}</Link>
        <Link to={Links.BASIC.path}>{Links.BASIC.text}</Link>
        <Link to={Links.COMPOUND.path}>{Links.COMPOUND.text}</Link>
        <Link to={Links.RENDER_PROPS.path}>{Links.RENDER_PROPS.text}</Link>
    </div>
);

export default Header;
