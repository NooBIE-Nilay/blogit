import routes from "constants/routes";

import React from "react";

import { Articles } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import BlogitLogo from "components/Navbar/BlogitLogo";
import { FilePlusCorner } from "lucide-react";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

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
                tooltipProps={{ content: "Show all posts" }}
                onClick={() => history.push(routes.dashboard)}
              />
              <Button
                className="flex h-9 w-9 items-center justify-center rounded-md"
                icon={() => <FilePlusCorner size="18" />}
                style="primary"
                tooltipProps={{ content: "Add a blog post" }}
                onClick={() => history.push(`${routes.posts}/create`)}
              />
            </div>
          </div>
        </div>
      </header>
      {/* Sidebar for Larger Screens */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:flex md:h-screen md:w-20 md:flex-col md:items-center md:gap-y-3 md:border-r md:border-gray-200 md:bg-gray-50 md:pt-4">
        <Link aria-label="Home" to={routes.dashboard}>
          <BlogitLogo />
        </Link>
        <hr className="w-[70%] border-gray-300/60" />
        <Button
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
          icon={() => <Articles size={18} />}
          style="secondary"
          tooltipProps={{ content: "Show all posts" }}
          onClick={() => history.push(routes.dashboard)}
        />
        <Button
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
          icon={() => <FilePlusCorner size={18} />}
          style="secondary"
          tooltipProps={{ content: "Add a new post" }}
          onClick={() => history.push(`${routes.posts}/create`)}
        />
      </aside>
    </>
  );
};

export default Navbar;
