
export const DARK_MODE = 'DARK_MODE'


export const pressDarkMode = (data) => {
    return {
        type: DARK_MODE,
        payload: data
    };
};

