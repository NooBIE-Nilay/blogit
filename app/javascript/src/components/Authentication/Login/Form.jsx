import routes from "constants/routes";

import React from "react";

import { Button } from "neetoui";
import { Form as NeetoForm, Input } from "neetoui/formik";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { LOGIN_INITIAL_VALUES, LOGIN_VALIDATION_SCHEMA } from "../constants";

const Form = ({ handleSubmit, isLoading, t }) => (
  <div className="flex h-[80vh] items-center justify-center bg-gray-50 px-4  sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-700">
        {t("auth.signinTitle")}
      </h2>
      <div className="text-center">
        <Link
          className="mt-2 text-sm font-medium text-indigo-500 transition duration-150 ease-in-out focus:underline focus:outline-none"
          to={routes.signup}
        >
          {t("auth.signupLink")}
        </Link>
      </div>
      <NeetoForm
        className="mt-8 flex flex-col gap-y-6"
        formikProps={{
          initialValues: LOGIN_INITIAL_VALUES,
          validationSchema: LOGIN_VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        <Input
          label={t("auth.email")}
          name="email"
          placeholder={t("auth.emailPlaceholder")}
          type="email"
        />
        <Input
          label={t("auth.password")}
          name="password"
          placeholder={t("auth.passwordPlaceholder")}
          type="password"
        />
        <Button
          className="justify-center"
          disabled={isLoading}
          label={t("auth.signinTitle")}
          type="submit"
        />
      </NeetoForm>
    </div>
  </div>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withTranslation()(Form);
