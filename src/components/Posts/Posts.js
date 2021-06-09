import React from "react";
import { Post } from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

export const Posts = ({ setcurrentID }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  console.log("posts below...using useSelector");
  console.log(posts);

  if (!posts.length && !isLoading) {
    return "No posts present... You can create one";
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setcurrentID={setcurrentID} />
        </Grid>
      ))}
    </Grid>
  );
};
