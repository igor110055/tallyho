import { TRANSACTION_SPEED_SET } from "../Actions/actionTypes";
import { AUDIO_TRANSACTION_SET } from "../Actions/actionTypes";
import { SLIPPAGE_TOLERANCE_SET } from "../Actions/actionTypes";
import { TRANSACTION_DEADLINE_SET } from "../Actions/actionTypes";

export function setTransactionSpeed(data) {
  return (dispatch) => {
    dispatch({
      type: TRANSACTION_SPEED_SET,
      payload: data,
    });
  };
}

export function setSlippageTolerance(data) {
  return (dispatch) => {
    dispatch({
      type: SLIPPAGE_TOLERANCE_SET,
      payload: data,
    });
  };
}

export function setTransactionDeadline(data) {
  return (dispatch) => {
    dispatch({
      type: TRANSACTION_DEADLINE_SET,
      payload: data,
    });
  };
}

export function setTransactionAudio(data) {
  return (dispatch) => {
    dispatch({
      type: AUDIO_TRANSACTION_SET,
      payload: data,
    });
  };
}
