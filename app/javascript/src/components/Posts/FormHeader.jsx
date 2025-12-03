import routes from "constants/routes";

import React, { useState } from "react";

import { MenuHorizontal, ExternalLink } from "neetoIcons";
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
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();

  const { Menu, MenuItem } = ActionDropdown;

  const handlePreview = () => {
    if (type === "update") {
      history.push(routes.posts.preview.edit.replace(":slug", post.slug));
    } else {
      history.push(routes.posts.preview.create);
    }
  };

  return (
    <div className="flex w-full items-center justify-between  pr-6">
      <PageTitle title={t(type === "create" ? "posts.new" : "posts.edit")} />
      <div className="flex gap-2">
        <Button
          icon={() => <ExternalLink />}
          style="text"
          onClick={handlePreview}
        />
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
            buttonStyle="text"
            closeOnOutsideClick={false}
            icon={() => <MenuHorizontal />}
          >
            <DeleteButton
              {...{ post, isDeleteAlertOpen, setIsDeleteAlertOpen }}
            />
          </Dropdown>
        )}
      </div>
    </div>
  );
};
export default FormHeader;
