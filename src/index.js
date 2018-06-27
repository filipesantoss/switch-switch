import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Links from './core/links';
import Switch from './core/switch';
import Header from './core/header';
import Base from './core/base';

ReactDOM.render(
    <Router>
        <div>
            <Header />
            <Route exact path={Links.SWITCH.path} component={Switch} />
            <Route exact path={Links.BASIC.path} component={Base} />
        </div>
    </Router>,
    document.getElementById('root')
);
