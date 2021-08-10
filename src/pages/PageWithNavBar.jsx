import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Depression from './depression/depression';

const PageWithNavBar = () => {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/depression" component={Depression} />
                </Switch>
            </Router>
            <div className="app-container">
                <h1>PageWithNavBar</h1>
            </div>
        </React.Fragment>
    );
};

export default PageWithNavBar;