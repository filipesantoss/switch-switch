import React from 'react';
import Switch from '../core/switch';

/**
 * Share data for a tree of React without having to explicitly pass a prop.
 */

const Context = React.createContext();

/**
 * `Context.Consumer` may only be rendered within a `Context.Provider`.
 * Validates that a contextValue exists before rendering.
 */

const Consumer = ({ children }) => (
    <Context.Consumer>
        {contextValue => {
            if (!contextValue) {
                throw new Error();
            }

            return children(contextValue);
        }}
    </Context.Consumer>
);

/**
 * Focus on presentation while the logic is tucked away in container components.
 */

class CompoundComponents extends React.Component {
    static On = ({ children }) => (
        /**
         * Subscribes to context changes.
         * Requires a function as a child that receives the current context value and returns a React node.
         */

        <Consumer>{contextValue => (contextValue.on ? children : null)}</Consumer>
    );

    static Off = ({ children }) => (
        <Consumer>{contextValue => (contextValue.on ? null : children)}</Consumer>
    );

    static Slider = () => (
        <Consumer>
            {contextValue => <Switch on={contextValue.on} onChange={contextValue.onClick} />}
        </Consumer>
    );

    state = { on: false };

    onClick = () => this.setState({ on: !this.state.on });

    render() {
        return (
            /**
             * Allows Consumers to subscribe to context changes.
             * Accepts a value prop to be passed to Consumers.
             */

            <Context.Provider value={{ on: this.state.on, onClick: this.onClick }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default CompoundComponents;

export const Example = (
    <CompoundComponents>
        <CompoundComponents.On>'on'</CompoundComponents.On>
        <CompoundComponents.Slider />
        <CompoundComponents.Off>'off'</CompoundComponents.Off>
    </CompoundComponents>
);
