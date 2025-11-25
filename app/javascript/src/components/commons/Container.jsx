import React from "react";

import classnames from "classnames";
import Navbar from "components/NavBar";
import PropTypes from "prop-types";

const Container = ({ children, className = "" }) => (
  <>
    <Navbar />
    <div className={classnames("mx-auto  max-w-6xl md:pl-24 ", [className])}>
      {children}
    </div>
  </>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
