import React from "react";

import { Button } from "@bigbinary/neetoui";
import { FilePlusCorner } from "lucide-react";
import { Link, useHistory } from "react-router-dom";

import BlogitLogo from "./BlogitLogo";

const Navbar = () => {
  const history = useHistory();

  return (
    <>
      <header className="border-b bg-white md:hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <Link to="/dashboard">
              <BlogitLogo />
            </Link>
            <div>
              <Button
                className="h-9 w-9 rounded-md"
                icon={() => <FilePlusCorner size={18} />}
                style="primary"
                onClick={() => history.push("/posts/create")}
              />
            </div>
          </div>
        </div>
      </header>
      <aside className="hidden md:fixed md:left-0 md:top-0 md:flex md:h-screen md:w-20 md:flex-col md:items-center md:gap-y-3 md:border-r md:border-gray-200 md:bg-gray-50 md:pt-4">
        <Link aria-label="Home" to="/dashboard">
          <BlogitLogo />
        </Link>
        <hr className="w-[70%] border-gray-300/60" />
        <Button
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-md"
          icon={() => <FilePlusCorner size={18} />}
          style="primary"
          onClick={() => history.push("/posts/create")}
        />
      </aside>
    </>
  );
};

export default Navbar;
