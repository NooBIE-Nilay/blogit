import routes from "constants/routes";

import React from "react";

import { t } from "i18next";
import { NoData } from "neetoui";
import PropTypes from "prop-types";
import { isNil, isEmpty, either, isNotEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import useCategoryStore from "stores/useCategoryStore";

import Item from "./Item";

const List = ({ data }) => {
  const history = useHistory();

  const { selectedCategories } = useCategoryStore();

  if (either(isNil, isEmpty)(data)) {
    let title = t("posts.empty");
    if (isNotEmpty(selectedCategories)) {
      title = t("posts.empty_filter");
    }

    return (
      <NoData
        title={title}
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
