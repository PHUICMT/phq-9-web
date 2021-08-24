import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderWithIcon from "../components/header-with-icon/header-with-icon";
import Nuvbar from "../components/header/header"

const PageWithNavBar = () => {
    return (
        <React.Fragment>
            <Nuvbar/>
            <HeaderWithIcon/>

            <Router>
                <Switch>
                    <Route path="/phq-9" component={null} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default PageWithNavBar;