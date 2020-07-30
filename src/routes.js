import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Tasks from './pages/Tasks';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Tasks} />
                <Route path="*" component={() => <p style={{color: 'white'}}>404 NOT FOUND</p>} />                        
            </Switch>
        </BrowserRouter>
    );
}