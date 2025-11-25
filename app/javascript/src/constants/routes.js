const routes = {
  root: "/",
  dashboard: "/dashboard",
  posts: {
    create: "/posts/create",
    show: "/posts/:slug/show",
    edit: "/posts/:slug/edit",
  },
};

export default routes;
