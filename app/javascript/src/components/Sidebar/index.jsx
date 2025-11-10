import React from "react";

import { FilePlusCorner } from "lucide-react";
import { Link } from "react-router-dom";

import BlogitLogo from "./BlogitLogo";

const Sidebar = () => (
  <div className="bg-primary-white bg  fixed left-0 flex  h-screen w-20 flex-col items-center gap-y-3  border-r border-gray-300 bg-gray-100/90 pt-4 transition-all duration-500">
    <Link to="/dashboard">
      <BlogitLogo />
    </Link>
    <hr className="w-[90%]  border-gray-400/75" />
    <Link
      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:shadow"
      to="/posts/create"
    >
      <FilePlusCorner />
    </Link>
  </div>
);

export default Sidebar;
