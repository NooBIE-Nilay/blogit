import React from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import Logger from "js-logger";
import { Avatar, Button, Dropdown, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage, setAuthToLocalStorage } from "utils/storage";

const UserAvatar = () => {
  const { Menu, Divider } = Dropdown;

  const { t } = useTranslation();

  const userName = getFromLocalStorage("authUserName");

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
      window.location.href = "/";
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <Dropdown
      buttonStyle=""
      icon={() => <Avatar user={{ username: userName }} />}
    >
      <Menu className="p-2">
        <Typography className="font-semibold" style="h5">
          {userName}
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
