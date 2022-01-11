import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";

import { setupMockApi } from "./api/mock"
setupMockApi({
  getRequestShouldSucceed: true,
  postRequestShouldSucceed: true,
  getDelay: 5,
  postDelay: 5
})

ReactDOM.render(<App />, document.getElementById("root"));