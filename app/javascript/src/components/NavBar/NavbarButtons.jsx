import routes from "constants/routes";

import React from "react";

import { List, Edit, ListDetails, Folder } from "neetoIcons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const NavbarButtons = ({ setIsCategoryPaneOpen }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const fixedButtonProps = {
    className: "mx-auto flex h-10 w-10 items-center justify-center rounded-md",
    style: "secondary",
  };

  const buttonActions = [
    {
      icon: () => <List size={20} />,
      tooltipProps: { content: t("posts.showAll") },
      onClick: () => history.push(routes.dashboard),
    },
    {
      icon: () => <Edit size={20} />,
      tooltipProps: { content: t("posts.add") },
      onClick: () => history.push(routes.posts.create),
    },
    {
      disabled:
        history.location.pathname !== routes.dashboard &&
        history.location.pathname !== routes.root,
      icon: () => <ListDetails size={20} />,
      tooltipProps: { content: t("category.filter") },
      onClick: () => setIsCategoryPaneOpen(prevState => !prevState),
    },
    {
      icon: () => <Folder size={20} />,
      tooltipProps: { content: t("myPosts.show") },
      onClick: () => history.push(routes.myPosts),
    },
  ];

  return buttonActions.map((buttonProps, index) => (
    <Button {...buttonProps} {...fixedButtonProps} key={index} />
  ));
};

export default NavbarButtons;
