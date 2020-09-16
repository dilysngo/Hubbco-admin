import types from'../../mutation-types';
import _ from'lodash';
const SET_DATA_PRODUCTS_BY_BRAND = (state, messages)=>{
    state.product_brand = messages.results;
};
const PRODUCT_BY_ID = (state, messages,)=>{
    state.product = messages;
};
export default{
    PRODUCT_BY_ID,
    SET_DATA_PRODUCTS_BY_BRAND,
    [types.PRODUCT_BY_CATEGORIES](state, data) {
        state.productByCategories = data;
    },
    [types.PRODUCTS_LIST](state, data) {
        state.listProduct = data;
    },
    [types.PRODUCTS_PAGINATION](state, pagination) {
        state.pagination = pagination;
    },
    [types.SET_DELETE_PRODUCT](state, messages) {
        state.listProduct = _.filter(state.listProduct, function(o) {
            return o.id !== messages;
        });
        state.pagination.total =  state.pagination.total - 1;
    }
    
};
