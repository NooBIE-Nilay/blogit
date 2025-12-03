import routes from "constants/routes";

import React from "react";

import { MenuHorizontal } from "neetoIcons";
import { ActionDropdown, Button, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { DeleteButton, PageTitle } from "../commons";

const FormHeader = ({
  status,
  setStatus,
  type = "create",
  handleSubmit,
  post,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { Menu, MenuItem } = ActionDropdown;

  return (
    <div className="flex w-full items-center justify-between  pr-6">
      <PageTitle title={t(type === "create" ? "posts.new" : "posts.edit")} />
      <div className="flex gap-2">
        <Button
          label="Cancel"
          style="secondary"
          onClick={() => history.push(routes.root)}
        />
        <ActionDropdown label={t(`status.${status}`)} onClick={handleSubmit}>
          <Menu>
            <MenuItem.Button
              id="published"
              onClick={event => {
                setStatus(event.target.id);
              }}
            >
              {t("status.published")}
            </MenuItem.Button>
            <MenuItem.Button
              id="draft"
              onClick={event => {
                setStatus(event.target.id);
              }}
            >
              {t("status.draft")}
            </MenuItem.Button>
          </Menu>
        </ActionDropdown>
        {type === "update" && (
          <Dropdown
            buttonStyle="secondary"
            closeOnOutsideClick={false}
            icon={() => <MenuHorizontal />}
          >
            <DeleteButton {...{ post }} />
          </Dropdown>
        )}
      </div>
    </div>
  );
};
export default FormHeader;
