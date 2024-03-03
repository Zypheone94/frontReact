const initialState = {
    user: null, // ou tout autre structure que vous utilisez
    // ...
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        // Autres cas de réduction
        default:
            return state;
    }
};

export default authReducer;
