import routes from "constants/routes";

import React, { useState } from "react";

import { List, Edit, ListDetails, Folder } from "neetoIcons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

import BlogitLogo from "./BlogitLogo";
import CategoryPane from "./CategoryPane";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const [isCategoryPaneOpen, setIsCategoryPaneOpen] = useState(false);

  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      <aside className=" fixed hidden justify-between pb-8 md:left-0 md:top-0 md:flex md:h-screen md:w-20 md:flex-col md:items-center md:border-gray-200 md:bg-gray-50">
        <div className="flex flex-col  gap-y-3 pt-4">
          <Link aria-label="Home" to={routes.dashboard}>
            <BlogitLogo />
          </Link>
          <hr className=" border-gray-300/60" />
          <Button
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
            icon={() => <List size={20} />}
            style="secondary"
            tooltipProps={{ content: t("posts.showAll") }}
            onClick={() => history.push(routes.dashboard)}
          />
          <Button
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
            icon={() => <Edit size={20} />}
            style="secondary"
            tooltipProps={{ content: t("posts.add") }}
            onClick={() => history.push(routes.posts.create)}
          />
          <Button
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
            disabled={history.location.pathname !== routes.dashboard}
            icon={() => <ListDetails size={20} />}
            style="secondary"
            tooltipProps={{ content: t("category.filter") }}
            onClick={() => setIsCategoryPaneOpen(prevState => !prevState)}
          />
          <Button
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
            icon={() => <Folder size={20} />}
            style="secondary"
            tooltipProps={{ content: t("myPosts.show") }}
            onClick={() => history.push(routes.myPosts)}
          />
        </div>
        <UserAvatar />
      </aside>
      <CategoryPane
        {...{
          setIsCategoryPaneOpen,
          isCategoryPaneOpen,
        }}
      />
    </>
  );
};

export default Navbar;
