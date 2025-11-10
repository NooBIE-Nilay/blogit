import React from "react";

import { FileStack } from "lucide-react";

const Blogit = () => (
  <div
    className="flex flex-col items-center gap-0.5  rounded-md bg-black/90  px-3 py-2
   text-white  transition-all duration-500 hover:bg-black/70  focus:shadow"
  >
    <FileStack size={25} />
    <span className="text-sm font-medium">Blogit</span>
  </div>
);

export default Blogit;
