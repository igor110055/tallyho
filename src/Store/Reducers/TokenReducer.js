import { TOKEN_FOUND_BY_ADDRESS } from "../Actions/actionTypes";

// In production mode, typical tokens are listed here.
const initialData = {};
export function TokenReducer(state = initialData, action) {
  switch (action.type) {
    // this action is called when user adds a token to the typical tokens
    case TOKEN_FOUND_BY_ADDRESS:
      const data = action.payload;
      state[data.symbol] = {
        address: data.address,
        name: data.name,
      };
      return state;
    default:
      return state;
  }
}
