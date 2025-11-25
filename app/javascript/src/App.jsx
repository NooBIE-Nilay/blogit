import routes from "constants/routes";

import React from "react";

import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import { CreatePost, ShowPost, EditPost } from "components/Posts";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={Dashboard} path={routes.dashboard} />
      <Route exact component={EditPost} path={routes.posts.edit} />
      <Route exact component={ShowPost} path={routes.posts.show} />
      <Route exact component={CreatePost} path={routes.posts.create} />
      <Route exact component={Signup} path={routes.signup} />
      <Redirect exact from={routes.root} to={routes.dashboard} />
    </Switch>
  </Router>
);

export default App;
