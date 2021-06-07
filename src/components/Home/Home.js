import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { Posts } from "../Posts/Posts";
import { Form } from "../Form/Form";
import { getPosts } from "../../actions/posts";

export const Home = () => {
  const [currentID, setcurrentID] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentID, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} sm={7}>
            <Posts setcurrentID={setcurrentID} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Form currentID={currentID} setcurrentID={setcurrentID} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
