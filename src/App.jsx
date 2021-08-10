import "./App.scss";
import PageWithNavBar from './pages/PageWithNavBar';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={PageWithNavBar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
