import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "@forevolve/bootstrap-dark/dist/css/bootstrap-dark.min.css";
import "font-awesome/css/font-awesome.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import config from "./config";
import { BrowserRouter as Router } from "react-router-dom";
import { mockCovidApi } from "./data/mock/ApiMock";

// enable mock if we are in dev mode
if (config.mock_enabled) {
  console.log("Activating Mock...");
  mockCovidApi();
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
