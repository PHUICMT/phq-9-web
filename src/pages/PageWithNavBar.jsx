import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/header/header"
import HeaderWithIcon from "../components/header-with-icon/header-with-icon";
import AcceptCard from "../components/accept-card/accept-card"
import AcceptToggle from "../components/accept-toggle/accept-toggle"

const PageWithNavBar = () => {
    return (
        <React.Fragment>
            <Header/>
            <HeaderWithIcon/>
            <AcceptCard/>
            <AcceptToggle/>

            <Router>
                <Switch>
                    <Route path="/phq-9" component={null} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default PageWithNavBar;