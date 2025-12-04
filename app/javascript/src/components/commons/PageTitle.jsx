import React from "react";

import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

const PageTitle = ({ title, count, t }) => (
  <>
    <h2 className="mt-8 text-4xl font-semibold">{title}</h2>
    {!!count && (
      <div className="text-xl font-semibold">
        {`${count} ${t("common.articles")}`}
      </div>
    )}
  </>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
};

export default withTranslation()(PageTitle);
