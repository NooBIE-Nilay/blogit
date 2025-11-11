import React from "react";

import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/Dashboard";
import CreatePost from "./components/Posts/Create";
import ShowPost from "./components/Posts/Show";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={Dashboard} path="/dashboard" />
      <Route exact component={ShowPost} path="/posts/:slug/show" />
      <Route exact component={CreatePost} path="/posts/create" />
      <Redirect exact from="/" to="/dashboard" />
    </Switch>
  </Router>
);

export default App;
