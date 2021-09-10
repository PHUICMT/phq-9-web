import "./App.scss";

import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import MainPage from './pages/MainPage';
import Header from "./components/header/header";
import PHQTestComponent from './components/phq-9-test/phq-9-test';
import Report from './components/report/report';

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/index" component={MainPage} />
          <Route path="/phq-9" component={PHQTestComponent} />
          <Route path="/report" render={(props) => <Report {...props} />} />
          <Route path='*' exact >
            <Redirect from='*' to='/index' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
