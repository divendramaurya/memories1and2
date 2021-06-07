import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log("in AUTH reducer ::");
      console.log(action?.data);
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case LOGOUT:
      console.log("in LOGOUT reducer ::");
      localStorage.removeItem("profile");
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;

localStorage.removeItem("mytime");
