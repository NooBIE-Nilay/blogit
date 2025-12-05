import routes from "constants/routes";

import React, { useState } from "react";

import { Link } from "react-router-dom";

import BlogitLogo from "./BlogitLogo";
import CategoryPane from "./CategoryPane";
import NavbarButtons from "./NavbarButtons";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const [isCategoryPaneOpen, setIsCategoryPaneOpen] = useState(false);

  return (
    <>
      <aside className=" fixed  justify-between pb-8 md:left-0 md:top-0 md:flex md:h-screen md:w-20 md:flex-col md:items-center md:border-gray-200 md:bg-gray-50">
        <div className="flex flex-col  gap-y-3 pt-4">
          <Link aria-label="Home" to={routes.dashboard}>
            <BlogitLogo />
          </Link>
          <hr className=" border-gray-300/60" />
          <NavbarButtons {...{ setIsCategoryPaneOpen }} />
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
