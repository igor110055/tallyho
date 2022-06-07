import { TALLY_PRICE_GET } from "../Actions/actionTypes";

// In production mode, typical tokens are listed here.
const initialData = {
    tally: 0,
};
export function TokenPriceReducer(state = initialData, action) {
    const data = action.payload;
    switch (action.type) {
        // this action is called when user adds a token to the typical tokens
        case TALLY_PRICE_GET:
            return {
                ...state,
                tally: data,
            };
        default:
            return state;
    }
}