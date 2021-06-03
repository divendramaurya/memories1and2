import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
  DISLIKE,
} from "../constants/actionTypes.js";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...posts, action.payload];

    case UPDATE:
      console.log("below is UPDATE reducer post");
      console.log(posts);
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case LIKE:
      console.log("below is LIKE reducer post");
      console.log(posts);
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DISLIKE:
      console.log("below is DISLIKE reducer post");
      console.log(posts);
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
};

export default reducer;
