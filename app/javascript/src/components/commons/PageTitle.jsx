import React from "react";

import PropTypes from "prop-types";

const PageTitle = ({ title }) => (
  <h2 className="my-8 text-4xl font-semibold">{title}</h2>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
