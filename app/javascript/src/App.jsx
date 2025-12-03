import routes from "constants/routes";

import React from "react";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Dashboard from "components/Dashboard";
import MyPosts from "components/MyPosts";
import { CreatePost, ShowPost, EditPost } from "components/Posts";
import Preview from "components/Posts/Preview";
import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import queryClient from "utils/queryClient";
import { getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={EditPost} path={routes.posts.edit} />
          <Route exact component={ShowPost} path={routes.posts.show} />
          <Route exact component={CreatePost} path={routes.posts.create} />
          <Route exact component={Preview} path={routes.posts.preview.edit} />
          <Route exact component={Preview} path={routes.posts.preview.create} />
          <Route exact component={Signup} path={routes.signup} />
          <Route exact component={Login} path={routes.login} />
          <Route exact component={MyPosts} path={routes.myPosts} />
          <PrivateRoute
            component={Dashboard}
            condition={isLoggedIn}
            path={routes.root}
            redirectRoute={routes.login}
          />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
