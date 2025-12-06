import routes from "constants/routes";

import React from "react";

import { useLogout } from "hooks/reactQuery/useAuthApi";
import { Avatar, Button, Dropdown, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";

const UserAvatar = () => {
  const { Menu, Divider } = Dropdown;

  const { t } = useTranslation();

  const history = useHistory();

  const username = getFromLocalStorage("authUserName");

  const { mutate: logout } = useLogout();

  const handleLogout = async () => {
    logout(null, {
      onSuccess: () => {
        history.push(routes.login);
      },
    });
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
