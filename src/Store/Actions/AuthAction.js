import axios from "axios";
import { SIGN_UP } from "./actionTypes";

export function Signup(data) {
  return (dispatch) => {
    axios
      .post("API url here", data)
      .then((response) => {
        console.log(response);
        dispatch(setUserData(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function setUserData(data) {
  return {
    type: SIGN_UP,
    payload: data,
  };
}
