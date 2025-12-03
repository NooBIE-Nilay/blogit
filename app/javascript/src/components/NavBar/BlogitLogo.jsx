import React from "react";

import { withTranslation } from "react-i18next";

const BlogitLogo = ({ t }) => (
  <div
    className="flex flex-col items-center gap-0.5  rounded-md px-3 pt-2
     transition-all duration-500   focus:shadow"
  >
    <svg
      className="lucide lucide-file-stack-icon lucide-file-stack"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1" />
      <path d="M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1" />
      <path d="M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z" />
    </svg>
    <span className=" text-sm font-medium">{t("title")}</span>
  </div>
);

export default withTranslation()(BlogitLogo);
