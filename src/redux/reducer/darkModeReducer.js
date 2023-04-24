import { DARK_MODE } from "../action/darkModeAction";


const INITIAL_STATE = {
    status: {
        dark: false
    }
};
const darkModeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DARK_MODE:
            console.log("action", action)
            return {
                ...state,
                status: {
                    dark: action.payload
                },
            };
        default: return state;
    }
};

export default darkModeReducer;