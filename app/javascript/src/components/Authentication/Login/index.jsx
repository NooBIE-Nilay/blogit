import routes from "constants/routes";

import React from "react";

import LoginForm from "components/Authentication/Login/Form";
import { useLogin } from "hooks/reactQuery/useAuthApi";

const Login = () => {
  const { mutate: login, isLoading } = useLogin();

  const handleSubmit = payload => {
    login(payload, {
      onSuccess: () => {
        window.location.href = routes.dashboard;
      },
    });
  };

  return <LoginForm {...{ handleSubmit, isLoading }} />;
};

export default Login;
