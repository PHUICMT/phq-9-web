import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const PageWithNavBar = () => {
    return (
        <React.Fragment>
            <img alt="header" src="https://i.imgur.com/78ue9bj.png" width="50%"/>
            <Router>
                <Switch>
                    <Route path="/phq-9" component={null} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default PageWithNavBar;