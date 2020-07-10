import types from'./types';

export default{
    [types.PROVIDER_LIST](state, listProvider) {
        state.listProvider = listProvider;
    },
    [types.PROVIDER_PAGINATION](state, paginationProvider) {
        state.paginationProvider = paginationProvider;
    },
};
