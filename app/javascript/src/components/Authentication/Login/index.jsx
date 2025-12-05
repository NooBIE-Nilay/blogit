import routes from "constants/routes";

import React, { useState } from "react";

import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Login/Form";
import { useLogin } from "hooks/reactQuery/useAuthApi";
import Logger from "js-logger";
import { setAuthToLocalStorage } from "utils/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: login, isLoading: isLoginLoading } = useLogin();

  const handleSubmit = async () => {
    await login(
      { email, password },
      {
        onSuccess: ({ data }) => {
          setAuthToLocalStorage({
            authToken: data.authentication_token,
            email: email.toLowerCase(),
            userId: data.id,
            userName: data.name,
          });
          setAuthHeaders();
          window.location.href = routes.dashboard;
        },
        onError: error => {
          Logger.error(error);
        },
      }
    );
  };

  return (
    <LoginForm
      isLoading={isLoginLoading}
      {...{ handleSubmit, setEmail, setPassword }}
    />
  );
};

export default Login;
