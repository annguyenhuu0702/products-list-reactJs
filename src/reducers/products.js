import * as Types from './../constants/ActionType';
var initialState = [];

const products = (state = initialState, action) => {
    let index = -1;
    const { id, product } = action;
    switch (action.type) {      
        case Types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        case Types.DELETE_PRODUCT:
            index = state.findIndex(x => x.id === id)
            if(index !== -1) {
                state.splice(index,1)
            }
            return [...state];
        case Types.ADD_PRODUCT:
            state.push(action.product);
            return [...state]
        case Types.UPDATE_PRODUCT:
            index = state.findIndex(x => x.id === id);
            state[index] = product;
            return [...state]
        default:
            return [...state];
    }
}


export default products;