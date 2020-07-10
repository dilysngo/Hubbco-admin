import types from'./types';

export default{
    [types.CATEGORY_LISTCATE](state, listCate) {
        state.listCate = listCate;
    },
    [types.CATEGORY_PAGINATION](state, pagination) {
        state.pagination = pagination;
    }
};
