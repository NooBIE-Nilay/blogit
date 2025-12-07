import React from "react";

import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

const PageTitle = ({ title }) => (
  <h2 className="mt-8 text-4xl font-semibold">{title}</h2>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withTranslation()(PageTitle);
