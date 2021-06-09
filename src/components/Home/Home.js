import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import { Posts } from "../Posts/Posts";
import { Form } from "../Form/Form";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination/Pagination";
import useStyles from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Home = () => {
  const classes = useStyles();
  const [currentID, setcurrentID] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  /* useEffect(() => {
    dispatch(getPosts());
  }, [currentID, dispatch]); */

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search posts
      searchPost();
      console.log("entered", e.target.value);
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagsToDelete) => {
    setTags(tags.filter((tag) => tag !== tagsToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}$tags=${tags.join(",")}`
      );
      //dispatch // fetch search post
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={4}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setcurrentID={setcurrentID} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentID={currentID} setcurrentID={setcurrentID} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
