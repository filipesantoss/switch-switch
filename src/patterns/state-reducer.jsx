import React from 'react';
import Switch from '../core/switch';

/**
 * Makes state management inside component flexible.
 */

class StateReducer extends React.Component {
    /**
     * Gives more information about the type of state change that will happen.
     * Allows taking action based on it.
     */

    static stateChangeType = { RESET: 'reset', CLICK: 'click', FORCE: 'force' };

    /**
     * State initializer pattern
     */

    initialState = { on: this.props.initialOn || false };
    state = this.initialState;

    /**
     * Exposes a hook to the way this component sets its state.
     * Allows the consumer to modify the state about to be set.
     */

    changeState = (stateChange, callback) =>
        this.setState(state => {
            const { type, ...reducedState } = this.props.reducer(state, stateChange);
            return reducedState;
        }, callback);

    onClick = ({ type = StateReducer.stateChangeType.CLICK }) =>
        this.changeState({ on: !this.state.on, type }, () => this.props.onClick());

    reset = () =>
        this.changeState({ ...this.initialState, type: StateReducer.stateChangeType.RESET }, () =>
            this.props.reset()
        );

    getStateAndHelpers = () => ({
        on: this.state.on,
        onClick: this.onClick,
        reset: this.reset
    });

    render() {
        return this.props.children(this.getStateAndHelpers());
    }
}

export default StateReducer;

class Counter extends React.Component {
    initialState = { clicks: 0, maximumClicks: this.props.maximumClicks };
    state = this.initialState;

    onClick = () => this.setState({ clicks: this.state.clicks + 1 });

    reset = () => this.setState({ clicks: this.initialState.clicks });

    // Overrides state change to make `on` remain false when max clicks is achieved, unless type of state change is forced.
    reducer = (state, changes) => {
        if (changes.type === StateReducer.stateChangeType.FORCE) {
            return changes;
        }

        return this.state.clicks >= this.initialState.maximumClicks
            ? { ...changes, on: false }
            : changes;
    };

    render() {
        return (
            <StateReducer onClick={this.onClick} reducer={this.reducer} reset={this.reset}>
                {({ on, onClick, reset }) => (
                    <div>
                        <Switch on={on} onClick={onClick} />
                        {this.state.clicks > this.initialState.maximumClicks
                            ? `Can't click more than ${this.initialState.maximumClicks} times`
                            : this.state.clicks > 0
                                ? `Clicks: ${this.state.clicks}`
                                : null}

                        <button onClick={reset}>Reset</button>
                        <button
                            onClick={() => onClick({ type: StateReducer.stateChangeType.FORCE })}
                        >
                            Force
                        </button>
                    </div>
                )}
            </StateReducer>
        );
    }
}

export const Example = <Counter maximumClicks={3} />;
