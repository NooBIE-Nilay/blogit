import React from "react";

import { Checkbox, Dropdown } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import { menuItems } from "./constants";

const ColumnDropdown = ({ checkedTitles, setCheckedTitles }) => {
  const { t } = useTranslation();

  const { Menu, MenuItem } = Dropdown;

  const isCheckboxChecked = title => checkedTitles.includes(title);

  const handleCheckboxChange = ({ target: { id: titleString } }) =>
    setCheckedTitles(prev =>
      isCheckboxChecked(titleString)
        ? prev.filter(title => title !== titleString)
        : [...prev, titleString]
    );

  return (
    <Dropdown
      buttonStyle="secondary"
      closeOnSelect={false}
      label={t("common.columns")}
    >
      <Menu>
        {menuItems.map(({ labelKey, ...itemProps }) => (
          <MenuItem className="p-2 " key={itemProps.id}>
            <Checkbox
              checked={isCheckboxChecked(itemProps.id)}
              label={t(labelKey)}
              onChange={handleCheckboxChange}
              {...itemProps}
            />
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default ColumnDropdown;
