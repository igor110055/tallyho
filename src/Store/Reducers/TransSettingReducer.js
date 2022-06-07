import { TRANSACTION_SPEED_SET } from "../Actions/actionTypes";
import { AUDIO_TRANSACTION_SET } from "../Actions/actionTypes";
import { SLIPPAGE_TOLERANCE_SET } from "../Actions/actionTypes";
import { TRANSACTION_DEADLINE_SET } from "../Actions/actionTypes";

// In production mode, typical tokens are listed here.
const initialData = {};
export function TransSettingReducer(state = initialData, action) {
  const data = action.payload;
  switch (action.type) {
    // this action is called when user adds a token to the typical tokens
    case TRANSACTION_SPEED_SET:
      return {
        ...state,
        transSpeed: data.transSpeed,
      };
    case TRANSACTION_DEADLINE_SET:
      return {
        ...state,
        deadline: data.deadline,
      };
    case AUDIO_TRANSACTION_SET:
      return {
        ...state,
        isAudioOn: data.isAudioOn,
      };
    case SLIPPAGE_TOLERANCE_SET:
      return {
        ...state,
        slipTolerance: data.slipTolerance,
      };
    default:
      return state;
  }
}
