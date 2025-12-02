import routes from "constants/routes";

import React, { useEffect, useRef } from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { FilePlusCorner } from "lucide-react";
import { Articles, Category } from "neetoIcons";
import { Avatar, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import useUIStore from "stores/useUIStore";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import BlogitLogo from "./BlogitLogo";
import CategoryPane from "./CategoryPane";

const Navbar = () => {
  const { isCategoryPaneOpen, setIsCategoryPaneOpen, toggleCategoryPane } =
    useUIStore();
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const userName = getFromLocalStorage("authUserName");

  const menuRef = useRef();

  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      {/* Mobile Topbar */}
      <header className="border-b bg-white md:hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <Link to={routes.dashboard}>
              <BlogitLogo />
            </Link>
            <div className="mr-3 flex gap-2">
              <Button
                className="flex h-9 w-9 items-center justify-center rounded-md"
                icon={() => <Articles size="20" />}
                style="primary"
                tooltipProps={{ content: t("posts.showAll") }}
                onClick={() => history.push(routes.dashboard)}
              />
              <Button
                className="flex h-9 w-9 items-center justify-center rounded-md"
                icon={() => <FilePlusCorner size="18" />}
                style="primary"
                tooltipProps={{ content: t("posts.add") }}
                onClick={() => history.push(routes.posts.create)}
              />
            </div>
          </div>
        </div>
      </header>
      {/* Sidebar for Larger Screens */}
      <aside className=" hidden justify-between pb-8 md:fixed md:left-0 md:top-0 md:flex md:h-screen md:w-20 md:flex-col md:items-center md:border-gray-200 md:bg-gray-50">
        <div className="flex flex-col  gap-y-3 pt-4">
          <Link aria-label="Home" to={routes.dashboard}>
            <BlogitLogo />
          </Link>
          <hr className=" border-gray-300/60" />
          <Button
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
            icon={() => <Articles size={18} />}
            style="secondary"
            tooltipProps={{ content: t("posts.showAll") }}
            onClick={() => history.push(routes.dashboard)}
          />
          <Button
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
            icon={() => <FilePlusCorner size={18} />}
            style="secondary"
            tooltipProps={{ content: t("posts.add") }}
            onClick={() => history.push(routes.posts.create)}
          />
          <Button
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
            icon={() => <Category size={20} />}
            style="secondary"
            tooltipProps={{ content: t("category.filter") }}
            onClick={() => toggleCategoryPane()}
          />
        </div>
        <div className="" ref={menuRef}>
          <Avatar
            user={{
              name: userName,
            }}
            onClick={() => setIsMenuVisible(prev => !prev)}
          />
          {isMenuVisible && (
            <div className="absolute bottom-12 z-20 mt-2 w-48 rounded-md border border-gray-300 bg-white py-1 shadow-xl">
              <span className="p-2 font-semibold text-gray-500">
                {userName}
              </span>
              <div
                className="block cursor-pointer px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
                onClick={handleLogout}
              >
                {t("auth.logoutTitle")}
              </div>
            </div>
          )}
        </div>
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
