import routes from "constants/routes";

import React from "react";

import { isPresent } from "neetoCist";
import { getFromLocalStorage } from "utils/storage";

import PrivateRoute from "./PrivateRoute";

const AuthProtectedRoute = ({ component, path, ...props }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = isPresent(authToken);

  return (
    <PrivateRoute
      {...{ component, path }}
      condition={isLoggedIn}
      redirectRoute={routes.login}
      {...props}
    />
  );
};

export default AuthProtectedRoute;
