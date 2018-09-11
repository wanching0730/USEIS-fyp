const initialState = {
    register: false
};

export default function registerReducer(state = initialState, { type, payload }) {
    switch(type) {
        case 'register':
            return payload.register;
        default: 
        // return initial state
            return state;
    }
}