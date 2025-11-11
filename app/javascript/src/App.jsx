import React from "react";

import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import CreatePost from "./components/Posts/Create";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={Dashboard} path="/dashboard" />
      <Route exact component={CreatePost} path="/posts/create" />
      <Redirect exact from="/" to="/dashboard" />
    </Switch>
  </Router>
);

export default App;
