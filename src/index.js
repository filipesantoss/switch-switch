import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Links from './core/links';
import Switch from './core/switch';
import Header from './core/header';
import Base from './core/base';
import { Example as CompoundComponentsExample } from './patterns/compound-components';
import { Example as RenderPropsExample } from './patterns/render-props';
import { Example as StateReducerExample } from './patterns/state-reducer';

ReactDOM.render(
    <Router>
        <div>
            <Header />
            <Route exact path={Links.SWITCH.path} component={Switch} />
            <Route exact path={Links.BASIC.path} component={Base} />
            <Route exact path={Links.COMPOUND.path} render={() => CompoundComponentsExample} />
            <Route exact path={Links.RENDER_PROPS.path} render={() => RenderPropsExample} />
            <Route exact path={Links.STATE_REDUCER.path} render={() => StateReducerExample} />
        </div>
    </Router>,
    document.getElementById('root')
);
