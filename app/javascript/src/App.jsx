import routes from "constants/routes";

import React from "react";

import { Login, Signup } from "components/Authentication";
import { AuthProtectedRoute, PageNotFound } from "components/commons";
import Dashboard from "components/Dashboard";
import MyPosts from "components/MyPosts";
import { CreatePost, ShowPost, EditPost } from "components/Posts";
import Preview from "components/Posts/Preview";
import { QueryClientProvider } from "react-query";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import queryClient from "utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Signup} path={routes.signup} />
        <Route exact component={Login} path={routes.login} />
        <AuthProtectedRoute component={EditPost} path={routes.posts.edit} />
        <AuthProtectedRoute component={ShowPost} path={routes.posts.show} />
        <AuthProtectedRoute component={CreatePost} path={routes.posts.create} />
        <AuthProtectedRoute component={MyPosts} path={routes.myPosts} />
        <AuthProtectedRoute component={Dashboard} path={routes.dashboard} />
        <AuthProtectedRoute
          component={Preview}
          path={routes.posts.preview.edit}
        />
        <AuthProtectedRoute
          component={Preview}
          path={routes.posts.preview.create}
        />
        <Redirect exact from={routes.root} to={routes.dashboard} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default App;
