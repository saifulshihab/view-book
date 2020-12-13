import React from "react";
import PublicPosts from "../Screens/PublicPosts";
import PostBox from "./PostBox";

const NewsFeed = () => {
  return (
    <div className="newsfeed">
      <PostBox />
      <div className="public_posts">
        <PublicPosts />
      </div>
    </div>
  );
};

export default NewsFeed;
