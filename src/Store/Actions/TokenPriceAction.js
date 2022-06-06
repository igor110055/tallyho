import { TALLY_PRICE_GET } from "../Actions/actionTypes";

export function setTallyPrice(data) {
  return (dispatch) => {
    dispatch({
      type: TALLY_PRICE_GET,
      payload: data,
    });
  };
}
