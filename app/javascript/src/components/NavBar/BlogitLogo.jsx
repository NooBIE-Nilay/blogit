import React from "react";

import { FileStack } from "lucide-react";

const BlogitLogo = () => (
  <div
    className="flex flex-col items-center gap-0.5  rounded-md px-3 pt-2
     transition-all duration-500   focus:shadow"
  >
    <FileStack color="black" size={25} />
    <span className=" text-sm font-medium">Blogit</span>
  </div>
);

export default BlogitLogo;
