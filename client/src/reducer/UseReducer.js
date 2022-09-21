export const initalState = null;

export const reducer = (state, action) => {
    if (action.type === "ADMIN") {
        return 100
    }
    else if (action.type === "USER") {
        return action.payload;
    }
    return state;
}