import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));

// HMR (Hot Module Replacement)
if (module.hot) {
  module.hot.accept();
}
