import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
  DISLIKE,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes.js";

const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };

    case FETCH_POST:
      return { ...state, post: action.payload };

    case CREATE:
      /* return [...state, action.payload]; */
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
      console.log("below is UPDATE reducer post");
      console.log(state);
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case LIKE:
      console.log("below is LIKE reducer post");
      console.log(state);
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DISLIKE:
      console.log("below is DISLIKE reducer post");
      console.log(state);
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
