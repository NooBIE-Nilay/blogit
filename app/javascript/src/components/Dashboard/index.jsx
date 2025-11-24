import React, { useState, useEffect } from "react";

import { Button } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { PageLoader, PageTitle, Container } from "components/commons";
import Logger from "js-logger";
import { isNil, isEmpty, either } from "ramda";
import { useHistory } from "react-router-dom";

import List from "./List";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Logger.error(error);
    }
  };

  const destroyPost = async slug => {
    try {
      await postsApi.destroy(slug);
      await fetchPosts();
    } catch (error) {
      Logger.error(error);
    }
  };

  const showPost = slug => {
    history.push(`/posts/${slug}/show`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created or been assigned any posts
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8 ">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <PageTitle title="Blog posts" />
          <div className="ml-4">
            <Button
              label="Add new blog post"
              style="primary"
              onClick={() => history.push("/posts/create")}
            />
          </div>
        </div>
        <List data={posts} {...{ showPost, destroyPost }} />
      </div>
    </Container>
  );
};

export default Dashboard;
