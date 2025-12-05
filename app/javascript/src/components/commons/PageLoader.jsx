import React from "react";

import classnames from "classnames";
import { Spinner } from "neetoui";
import PropTypes from "prop-types";

const PageLoader = ({ className = "" }) => (
  <div
    className={classnames(
      className,
      "flex h-screen w-screen flex-row items-center justify-center"
    )}
  >
    <Spinner />
  </div>
);

PageLoader.propTypes = {
  className: PropTypes.string,
};

export default PageLoader;
