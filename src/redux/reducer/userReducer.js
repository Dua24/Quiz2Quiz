import { FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGOUT_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        role: "USER",
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
                    image: action?.payload?.image || "https://external-preview.redd.it/5kh5OreeLd85QsqYO1Xz_4XSLYwZntfjqou-8fyBFoE.png?auto=webp&s=dbdabd04c399ce9c761ff899f5d38656d1de87c2"
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
                    role: "USER",
                    image: "",
                    email: ""
                },
                isAuthenticated: false
            };
        default: return state;
    }
};

export default userReducer;