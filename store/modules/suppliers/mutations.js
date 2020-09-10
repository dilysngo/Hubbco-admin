import types from'../../mutation-types';
import _ from'lodash';
const SET_DATA_PRODUCTS_BY_BRAND = (state, messages)=>{
    state.product_brand = messages.results;
};
// const SET_DELETE_PRODUCT = (state, messages)=>{
//     console.log('sds');
//     // state.product_brand = _.filter(state.product_brand, function(o) {
//     //     return o.id !== messages;
//     // });
// };
export default{

    // SET_DATA_PRODUCTS,
    // SET_UPDATE_PRODUCT,
    SET_DATA_PRODUCTS_BY_BRAND,
    [types.PRODUCT_BY_CATEGORIES](state, data) {
        state.productByCategories = data;
    },
    [types.SUPPLIERS_LIST](state, data) {
        state.listSuppliers = data;
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
