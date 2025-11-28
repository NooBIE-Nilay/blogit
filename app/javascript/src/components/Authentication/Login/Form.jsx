import React from "react";

import { Input, Button } from "neetoui";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Form = ({ handleSubmit, setEmail, setPassword, isLoading, t }) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-700">
        {t("auth.signupTitle")}
      </h2>
      <div className="text-center">
        <Link
          className="mt-2 text-sm font-medium text-indigo-500 transition duration-150 ease-in-out focus:underline focus:outline-none"
          to="/signup"
        >
          {t("auth.signupLink")}
        </Link>
      </div>
      <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
        <Input
          label={t("auth.email")}
          placeholder={t("auth.emailPlaceholder")}
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label={t("auth.password")}
          placeholder={t("auth.passwordPlaceholder")}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          disabled={isLoading}
          label={t("auth.signinTitle")}
          type="submit"
        />
      </form>
    </div>
  </div>
);

export default withTranslation()(Form);
