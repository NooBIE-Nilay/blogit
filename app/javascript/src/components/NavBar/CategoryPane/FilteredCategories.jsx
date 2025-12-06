import React from "react";

import classNames from "classnames";
import useSelectedCategoryStore from "stores/useSelectedCategoryStore";

const FilteredCategories = ({ filteredCategories }) => {
  const { toggleCategory, isSelected } = useSelectedCategoryStore();

  return (
    <div className="mt-4 flex flex-col gap-2">
      {filteredCategories?.map(category => {
        const { id: categoryId, name: categoryName } = category;

        return (
          <div
            key={categoryId}
            className={classNames(
              "relative mx-2  flex items-center justify-center rounded-md   py-2 font-medium hover:bg-gray-400 hover:text-white ",
              {
                "bg-gray-600 text-white": isSelected(categoryId),
                "bg-white ": !isSelected(categoryId),
              }
            )}
            onClick={() => toggleCategory(category)}
          >
            {categoryName}
          </div>
        );
      })}
    </div>
  );
};

export default FilteredCategories;
