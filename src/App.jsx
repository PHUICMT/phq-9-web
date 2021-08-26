import "./App.scss";

import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { recordScreen, recordVideo, stopRecord } from './services/video-record';

import MainPage from './pages/MainPage';
import Header from "./components/header/header";
import PHQTestComponent from './components/phq-9-test/phq-9-test';

function Recording() {
  const [isScreenRecord, setIsScreenRecord] = useState(false);
  const [isVideoRecord, setIsVideoRecord] = useState(false);

  useEffect(() => {
    if (!isScreenRecord) {
      setIsScreenRecord(true);
      recordScreen();
    }

    if (!isVideoRecord) {
      setIsVideoRecord(true);
      recordVideo();
    }
  }, [isScreenRecord, isVideoRecord]);
};

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function App() {
  // Recording()
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/index" component={MainPage} />
          <Route path="/phq-9" component={PHQTestComponent} />
          <Route path='*' exact >
            <Redirect from='*' to='/index' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
