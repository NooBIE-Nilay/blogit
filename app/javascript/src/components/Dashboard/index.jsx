import routes from "constants/routes";

import React, { useState, useEffect } from "react";

import postsApi from "apis/posts";
import { PageLoader, PageTitle, Container } from "components/commons";
import List from "components/Dashboard/List";
import Logger from "js-logger";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const { t } = useTranslation();

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

  return (
    <Container>
      <div className="flex flex-col gap-y-8 ">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <PageTitle title={t("posts.title")} />
          <div className="ml-4">
            <Button
              label={t("posts.add")}
              style="primary"
              onClick={() => history.push(routes.posts.create)}
            />
          </div>
        </div>
        <List data={posts} {...{ fetchPosts }} />
      </div>
    </Container>
  );
};

export default Dashboard;
