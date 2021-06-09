import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
  DISLIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log("in try of getPosts method");
    const { data } = await api.fetchPosts(page);
    console.log("getPosts all post data is below");
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("error occured in getPosts method ::" + error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log("in try of getPost method");
    const { data } = await api.fetchPost(id);
    console.log("getPost all post data is below");
    console.log(data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("error occured in getPost method ::" + error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log("in try of getPostBySearch ::");
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log("below is getPostBySearch data ::");
    console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("Error is getPostBySearch ::", error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log("in try of createPost method");
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`);
    console.log("createPost data is below");
    console.log(data);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("in catch of createPost");
    console.log("error occured in createPost method :: " + error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    console.log("in try of updatePost");
    const { data } = await api.updatePost(id, post);
    console.log("updatePost data is below");
    console.log(data);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log("in catch of updatePost");
    console.log("error occured in updatePost method :: " + error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    console.log("in try of deletePost");
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log("in catch of deletePost");
    console.log("error occured in deletePost method :: " + error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    console.log("in try of likePost");
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log("in catch of likePost");
    console.log("error occured in likePost method :: " + error);
  }
};

export const dislikePost = (id) => async (dispatch) => {
  try {
    console.log("in try of dislikePost");
    const { data } = await api.dislikePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log("in catch of dislikePost");
    console.log("error occured in dislikePost method :: " + error);
  }
};
