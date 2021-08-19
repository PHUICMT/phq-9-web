import "./App.scss";
import { useState, useEffect } from "react";
import PageWithNavBar from './pages/PageWithNavBar';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { recordScreen, recordVideo } from './services/video-record';
import { stopRecord } from "../src/services/video-record";

function Recording () {
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


function App() {
  Recording()
  return (
    <div className="App">
      <button onClick={() => {stopRecord()}}> STOP </button>
      <Router>
        <Switch>
          <Route path="/" component={PageWithNavBar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
