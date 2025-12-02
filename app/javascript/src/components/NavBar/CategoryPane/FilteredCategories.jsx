import React from "react";

import classNames from "classnames";
import useCategoryStore from "stores/useCategoryStore";

const FilteredCategories = ({ filteredCategories }) => {
  const { toggleCategory, isSelected } = useCategoryStore();

  return (
    <div className="mt-4 flex flex-col gap-2">
      {filteredCategories?.map(category => (
        <div
          key={category.id}
          className={classNames(
            "relative mx-2  flex items-center justify-center rounded-md  bg-white py-2 font-medium hover:bg-gray-400 hover:text-white",
            {
              "bg-gray-600 ": isSelected(category),
            }
          )}
          onClick={() => toggleCategory(category)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default FilteredCategories;
