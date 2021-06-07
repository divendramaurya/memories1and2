import * as api from "../api/index.js";
import { AUTH } from "../constants/actionTypes";

export const signin = (form, history) => async (dispatch) => {
  try {
    console.log("in try of signin method");
    const { data } = await api.signIn(form);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log("error occured in signin method ::" + error);
  }
};

export const signup = (form, history) => async (dispatch) => {
  try {
    console.log("in try of signup method");
    const { data } = await api.signUp(form);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log("error occured in signup method ::" + error);
  }
};
