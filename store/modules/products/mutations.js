import types from'../../mutation-types';

const SET_DATA_PRODUCTS_BY_BRAND = (state, messages)=>{
    state.product_brand = messages.results;
};
export default{
    // SET_DATA_PRODUCTS,
    SET_DATA_PRODUCTS_BY_BRAND,
    [types.PRODUCT_BY_CATEGORIES](state, data) {
        state.productByCategories = data;
    },
    [types.PRODUCTS_LIST](state, data) {
        state.listProduct = data;
    },
    [types.PRODUCTS_PAGINATION](state, pagination) {
        state.pagination = pagination;
    }
    
};
