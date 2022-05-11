import { TOKEN_FOUND_BY_ADDRESS } from "./actionTypes";

export function tokenFoundByAddress(data) {
  return (dispatch) => {
    dispatch({
      type: TOKEN_FOUND_BY_ADDRESS,
      payload: data,
    });
  };
}
