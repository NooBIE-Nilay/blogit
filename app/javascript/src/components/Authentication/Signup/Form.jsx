import routes from "constants/routes";

import React from "react";

import { Input, Button } from "neetoui";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Form = ({
  handleSubmit,
  setName,
  setEmail,
  setPassword,
  isLoading,
  setPasswordConfirmation,
  t,
}) => (
  <div
    className="flex min-h-screen items-center justify-center bg-gray-50
    px-4 py-12 sm:px-6 lg:px-8 "
  >
    <div className="w-full max-w-md">
      <h2
        className="mt-6 text-center text-3xl font-extrabold
        leading-9 text-gray-700"
      >
        {t("auth.signupTitle")}
      </h2>
      <div className="text-center">
        <Link
          to={routes.root}
          className="mt-2 text-center text-sm font-medium
            text-bb-purple transition duration-150 ease-in-out
            focus:underline focus:outline-none"
        >
          {t("auth.loginLink")}
        </Link>
      </div>
      <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
        <Input
          required
          label={t("auth.name")}
          placeholder={t("auth.namePlaceholder")}
          onChange={e => setName(e.target.value)}
        />
        <Input
          required
          label={t("auth.email")}
          placeholder={t("auth.emailPlaceholder")}
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          required
          label={t("auth.password")}
          placeholder={t("auth.passwordPlaceholder")}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          required
          label={t("auth.passwordConfirmation")}
          placeholder={t("auth.passwordPlaceholder")}
          type="password"
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
        <Button
          disabled={isLoading}
          label={t("common.register")}
          type="submit"
        />
      </form>
    </div>
  </div>
);

export default withTranslation()(Form);
