import routes from "constants/routes";

import React from "react";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Dashboard from "components/Dashboard";
import { CreatePost, ShowPost, EditPost } from "components/Posts";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={EditPost} path={routes.posts.edit} />
        <Route exact component={ShowPost} path={routes.posts.show} />
        <Route exact component={CreatePost} path={routes.posts.create} />
        <Route exact component={Signup} path={routes.signup} />
        <Route exact component={Login} path={routes.login} />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path={routes.root}
          redirectRoute={routes.login}
        />
      </Switch>
    </Router>
  );
};

export default App;
