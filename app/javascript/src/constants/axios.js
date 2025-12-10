const API_ENDPOINTS = {
  ROOT: "/",
  POSTS: "/posts",
  GENERATE_DOCUMENT: "/posts/:slug/document",
  DOWNLOAD_DOCUMENT: "/posts/:slug/document/download",
  VOTE: "/posts/:slug/vote",
  MY_POSTS: {
    INDEX: "/my_posts",
    BULK_DELETE: "/my_posts/bulk_delete",
    BULK_UPDATE_STATUS: "/my_posts/bulk_update_status",
  },
  CATEGORIES: "/categories",
  ORGANIZATIONS: "/organizations",
  USERS: "/users",
  SESSION: "/session",
};

export { API_ENDPOINTS };
