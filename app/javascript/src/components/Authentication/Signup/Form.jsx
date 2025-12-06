import routes from "constants/routes";

import React from "react";

import { useFetchOrganizations } from "hooks/reactQuery/useOrganizationApi";
import { Button } from "neetoui";
import { Form as NeetoForm, Input, Select } from "neetoui/formik";
import PropTypes from "prop-types";
import { useTranslation, withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { getOprganizationOptions } from "./utils";

import { SIGNUP_INITIAL_VALUES, SIGNUP_VALIDATION_SCHEMA } from "../constants";

const Form = ({ handleSubmit, isLoading }) => {
  const { data, isLoading: isOrganizationsLoading } = useFetchOrganizations();

  const organizations = data?.data?.organizations;

  const { t } = useTranslation();

  return (
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
        <NeetoForm
          className="mt-8 flex flex-col gap-y-6"
          formikProps={{
            initialValues: SIGNUP_INITIAL_VALUES,
            validationSchema: SIGNUP_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <Input
            required
            label={t("auth.name")}
            name="name"
            placeholder={t("auth.namePlaceholder")}
          />
          <Input
            required
            label={t("auth.email")}
            name="email"
            placeholder={t("auth.emailPlaceholder")}
            type="email"
          />
          <Select
            required
            isDisabled={isOrganizationsLoading}
            label={t("auth.organizations")}
            name="organization"
            options={getOprganizationOptions(organizations)}
            placeholder={t("auth.organizationsPlaceholder")}
          />
          <Input
            required
            label={t("auth.password")}
            name="password"
            placeholder={t("auth.passwordPlaceholder")}
            type="password"
          />
          <Input
            required
            label={t("auth.passwordConfirmation")}
            name="passwordConfirmation"
            placeholder={t("auth.passwordPlaceholder")}
            type="password"
          />
          <Button
            className="justify-center"
            disabled={isLoading}
            label={t("common.register")}
            type="submit"
          />
        </NeetoForm>
      </div>
    </div>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withTranslation()(Form);
