import routes from "constants/routes";

import React, { useState } from "react";

import Form from "components/Authentication/Signup/Form";
import { useSignup } from "hooks/reactQuery/useAuthApi";
import Logger from "js-logger";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { mutateAsync: signup, isLoading } = useSignup({
    onSuccess: () => {
      history.push(routes.root);
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    signup({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      setEmail={setEmail}
      setName={setName}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
    />
  );
};

export default Signup;
