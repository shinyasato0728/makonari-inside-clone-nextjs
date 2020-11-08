import React from "react";
import { compose } from "recompose";

import withAuthentication from "../Session/withAuthentication";
import withAuthorization from "../Session/withAuthorization";

const App = ({ children }) => (
  <div className="app">
    {children}
  </div>
);
const AppWithAuthentication = compose(
  withAuthentication,
  withAuthorization(false)
)(App);
const AppWithAuthorization = compose(
  withAuthentication,
  withAuthorization(true)
)(App);
export { AppWithAuthentication, AppWithAuthorization };
