import routes from "constants/routes";

import React from "react";

import SignupForm from "components/Authentication/Signup/Form";
import { useSignup } from "hooks/reactQuery/useAuthApi";

const Signup = () => {
  const { mutate: signup, isLoading } = useSignup();

  const handleSubmit = data => {
    const { organization, passwordConfirmation, ...user } = data;

    const payload = {
      ...user,
      organization_id: organization.value,
      password_confirmation: passwordConfirmation,
    };

    signup(payload, {
      onSuccess: () => {
        window.location.href = routes.login;
      },
    });
  };

  return (
    <SignupForm
      {...{
        handleSubmit,
        isLoading,
      }}
    />
  );
};

export default Signup;
