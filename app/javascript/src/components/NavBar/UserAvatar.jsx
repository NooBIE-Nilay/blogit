import routes from "constants/routes";

import React from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import Logger from "js-logger";
import { Avatar, Button, Dropdown, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getFromLocalStorage, setAuthToLocalStorage } from "utils/storage";

const UserAvatar = () => {
  const { Menu, Divider } = Dropdown;

  const { t } = useTranslation();

  const history = useHistory();

  const username = getFromLocalStorage("authUserName");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setAuthToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      history.push(routes.login);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <Dropdown buttonStyle="" icon={() => <Avatar user={{ username }} />}>
      <Menu className="p-2">
        <Typography className="font-semibold" style="h5">
          {username}
        </Typography>
        <Divider />
        <Button
          fullWidth
          label={t("auth.logoutTitle")}
          style="danger-text"
          onClick={handleLogout}
        />
      </Menu>
    </Dropdown>
  );
};

export default UserAvatar;
