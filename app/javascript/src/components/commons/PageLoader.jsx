import React from "react";

import classnames from "classnames";
import { Spinner } from "neetoui";

const PageLoader = ({ className = "" }) => (
  <div
    className={classnames(
      [className],
      "flex h-screen w-screen flex-row items-center justify-center"
    )}
  >
    <Spinner />
  </div>
);

export default PageLoader;
