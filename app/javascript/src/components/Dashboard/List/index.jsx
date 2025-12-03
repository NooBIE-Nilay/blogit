import routes from "constants/routes";

import React from "react";

import { NoData } from "neetoui";
import PropTypes from "prop-types";
import { isNil, isEmpty, either } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Item from "./Item";

const List = ({ data }) => {
  const history = useHistory();
  const { t } = useTranslation();

  if (either(isNil, isEmpty)(data)) {
    return (
      <NoData
        title={t("posts.empty")}
        primaryButtonProps={{
          label: t("posts.add"),
          onClick: () => history.push(routes.posts.create),
        }}
      />
    );
  }

  return (
    <div className="w-full">
      {data.map(post => (
        <Item key={post.id} {...{ post }} />
      ))}
    </div>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
};

export default List;
