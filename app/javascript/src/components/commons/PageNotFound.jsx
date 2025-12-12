import routes from "constants/routes";

import React from "react";

import { NoData } from "neetoui";
import { withTranslation } from "react-i18next";

const PageNotFound = ({ t }) => (
  <div className="flex min-h-screen w-full items-center justify-center">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.buttonLabel"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.root,
      }}
    />
  </div>
);

export default withTranslation()(PageNotFound);
