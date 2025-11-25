import routes from "constants/routes";

import React, { useState } from "react";

import authApi from "apis/auth";
import Form from "components/Authentication/Signup/Form";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.signup({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setLoading(false);
      history.push(routes.dashboard);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      loading={loading}
      setEmail={setEmail}
      setName={setName}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
    />
  );
};

export default Signup;
