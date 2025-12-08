import { POST_STATUS } from "constants";
import routes from "constants/routes";

import React, { useState } from "react";

import { DeleteButton, PageTitle } from "components/commons";
import { MenuHorizontal, ExternalLink } from "neetoIcons";
import { ActionDropdown, Button, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { FORM_TYPE } from "./constants";

const FormHeader = ({
  status,
  setStatus,
  type = FORM_TYPE.CREATE,
  handleSubmit,
  post,
}) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();

  const { Menu, MenuItem } = ActionDropdown;

  const handlePreview = () => {
    if (type === FORM_TYPE.UPDATE) {
      history.push(routes.posts.preview.edit.replace(":slug", post.slug));
    } else {
      history.push(routes.posts.preview.create);
    }
  };

  const isUpdateForm = type === FORM_TYPE.UPDATE;
  const dropdownLabel =
    status === POST_STATUS.PUBLISHED
      ? t("status.published")
      : t("status.draft");
  const pageTitle = isUpdateForm ? t("posts.edit") : t("posts.new");

  return (
    <div className="flex w-full items-center justify-between  pr-6">
      <PageTitle title={pageTitle} />
      <div className="flex gap-2">
        <Button
          icon={() => <ExternalLink />}
          style="text"
          onClick={handlePreview}
        />
        <Button
          label={t("common.cancel")}
          style="secondary"
          onClick={() => history.push(routes.root)}
        />
        <ActionDropdown label={dropdownLabel} onClick={handleSubmit}>
          <Menu>
            <MenuItem.Button
              id={POST_STATUS.PUBLISHED}
              onClick={event => {
                setStatus(event.target.id);
              }}
            >
              {t("status.published")}
            </MenuItem.Button>
            <MenuItem.Button
              id={POST_STATUS.DRAFT}
              onClick={event => {
                setStatus(event.target.id);
              }}
            >
              {t("status.draft")}
            </MenuItem.Button>
          </Menu>
        </ActionDropdown>
        {isUpdateForm && (
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
