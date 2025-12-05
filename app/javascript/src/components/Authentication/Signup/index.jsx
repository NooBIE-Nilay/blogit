import routes from "constants/routes";

import React, { useState } from "react";

import SignupForm from "components/Authentication/Signup/Form";
import { useSignup } from "hooks/reactQuery/useAuthApi";
import Logger from "js-logger";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");

  const { mutateAsync: signup, isLoading } = useSignup({
    onSuccess: () => {
      window.location.href = routes.login;
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
      organization_id: selectedOrganizationId,
    });
  };

  return (
    <SignupForm
      {...{
        handleSubmit,
        setName,
        setEmail,
        setPassword,
        isLoading,
        setPasswordConfirmation,
        setSelectedOrganizationId,
      }}
    />
  );
};

export default Signup;
