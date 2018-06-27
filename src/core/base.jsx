import React from 'react';
import Switch from './switch';

class Base extends React.Component {
    state = { on: false };

    onClick = () => this.setState({ on: !this.state.on });

    render() {
        return <Switch on={this.state.on} onClick={this.onClick} />;
    }
}

export default Base;
