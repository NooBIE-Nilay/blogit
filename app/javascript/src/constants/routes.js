const routes = {
  root: "/",
  dashboard: "/dashboard",
  posts: {
    create: "/posts/create",
    preview: {
      edit: "/posts/preview?source=edit&slug=:slug",
      create: "/posts/preview",
    },
    show: "/posts/:slug/show",
    edit: "/posts/:slug/edit",
  },
  signup: "/signup",
  login: "/login",
  myPosts: "/my_posts",
};

export default routes;
