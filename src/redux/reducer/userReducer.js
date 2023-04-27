import { FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGOUT_SUCCESS, FETCH_USER_UPDATE_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        image: "",
        email: ""
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    // access_token: action?.payload?.access_token,
                    // refresh_token: action?.payload?.refresh_token,
                    username: action?.payload?.username,
                    // role: action?.payload?.role,
                    email: action?.payload?.email,
                    id: action?.payload?._id,
                    image: action?.payload?.image
                },
                isAuthenticated: true
            };

        case FETCH_USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: "",
                    refresh_token: "",
                    username: "",
                    image: "",
                    email: ""
                },
                isAuthenticated: false
            };
        case FETCH_USER_UPDATE_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: "",
                    refresh_token: "",
                    id: action?.payload?._id,
                    email: action?.payload?.email,
                    username: action?.payload?.username,
                    image: action?.payload?.image,
                },
                isAuthenticated: true
            };
        default: return state;
    }
};

export default userReducer;