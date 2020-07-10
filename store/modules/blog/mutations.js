import types from'./types';

export default{
    [types.BLOG_LIST](state, listBlog) {
        state.listBlog = listBlog;
    },
    [types.BLOG_PAGINATION](state, paginationBlog) {
        state.paginationBlog = paginationBlog;
    }
};
