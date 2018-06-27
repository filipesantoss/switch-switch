import React from 'react';
import Switch from '../core/switch';

/**
 * Takes a function that returns a React element and calls it instead of implementing its own render logic.
 * Allows complete and entire control over the rendering
 */

class RenderProps extends React.Component {
    state = { on: false };

    onClick = () => this.setState({ on: !this.state.on });

    /**
     * Provide any state or helper functions that consumers need so they can be responsible for rendering.
     */
    getStateAndHelpers = () => ({
        on: this.state.on,
        getClickProps: this.getClickProps
    });

    /**
     * Abstract the required props.
     * Accepts an object of props and composes it with the required props.
     */
    getClickProps = ({ onClick, ...props }) => ({
        ...props,
        onClick: (...args) => {
            this.onClick();
            onClick && onClick(...args);
        }
    });

    render() {
        return this.props.children(this.getStateAndHelpers());
    }
}

export default RenderProps;

export const Example = (
    <RenderProps>
        {({ on, getClickProps }) => (
            <div>
                <Switch {...getClickProps({ on })} />
                <button
                    {...getClickProps({
                        onClick: () => console.log('button clicked')
                    })}
                >
                    {on ? 'off' : 'on'}
                </button>
            </div>
        )}
    </RenderProps>
);
