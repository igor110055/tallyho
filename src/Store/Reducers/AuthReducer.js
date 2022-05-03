import {
    SIGN_UP
} from "./../Actions/actionTypes"

const initialData = {
    user: {},
}
export function AuthReducer(state = initialData, action) {

    switch (action.type) {

        case SIGN_UP: {
            const data = action.payload;
            return {
                ...state,
                user: data
            }
        }
        default:
            return state;
    }
}