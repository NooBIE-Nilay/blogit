import routes from "constants/routes";

import React from "react";

import { t } from "i18next";
import { isNotPresent } from "neetoCist";
import { NoData } from "neetoui";
import PropTypes from "prop-types";
import { isNotEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import useSelectedCategoryStore from "stores/useSelectedCategoryStore";

import Item from "./Item";

const List = ({ data }) => {
  const history = useHistory();
  const { selectedCategories } = useSelectedCategoryStore();

  if (isNotPresent(data)) {
    const noDataTitle = isNotEmpty(selectedCategories)
      ? t("posts.empty_filter")
      : t("posts.empty");

    return (
      <NoData
        title={noDataTitle}
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
