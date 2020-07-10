import types from'./types';

export default{
    [types.MEDIA_LIST](state, list) {
        state.list = list;
    },
    [types.MEDIA_PAGINATION](state, pagination) {
        state.pagination = pagination;
    }
};
