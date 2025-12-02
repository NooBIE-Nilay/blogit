import routes from "constants/routes";

import React from "react";

import { ActionDropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import PageTitle from "../commons/PageTitle";

const FormHeader = ({ status, setStatus, type = "create", handleSubmit }) => {
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
              {t(`status.draft`)}
            </MenuItem.Button>
          </Menu>
        </ActionDropdown>
      </div>
    </div>
  );
};
export default FormHeader;
