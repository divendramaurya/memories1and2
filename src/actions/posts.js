import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
  DISLIKE,
} from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    console.log("in try of getPosts method");
    const { data } = await api.fetchPosts();
    console.log("getPosts all post data is below");
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log("error occured in getPosts method ::" + error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    console.log("in try of createPost method");
    const { data } = await api.createPost(post);
    console.log("createPost data is below");
    console.log(data);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log("in catch of createPost");
    console.log("error occured in createPost method :: " + error.message);
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
