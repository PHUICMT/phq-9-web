import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Depression from './depression/depression';

const PageWithNavBar = () => {
    return (
        <React.Fragment>
            <img src="https://i.imgur.com/78ue9bj.png" width="50%"/>
            <Router>
                <Switch>
                    <Route path="/depression" component={Depression} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default PageWithNavBar;