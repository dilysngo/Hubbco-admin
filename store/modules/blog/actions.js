import types from'../../mutation-types';

export default{
    async findBlogs({commit}, conditions) {
        if(!conditions)
            conditions = {};
        const data = await this.$axios.$get(`/api/blogs?keyword=${conditions.keyword}&skip=${conditions.skip || 0}&limit=${conditions.limit || 10}`);
        commit(types.BLOG_LIST, data.results);
        commit(types.BLOG_PAGINATION, data.pagination);
        return data;
    },

    async getBlogs({commit}, id) {
        const blog = await this.$axios.$get(`/api/blogs/${id}`);
        return blog;
    },

    async createBlog({commit}, data) {
        const blog = await this.$axios.$post(`/api/blogs/`, data);
        return blog;
    },
    async uploadImges({commit}, data){
        let result = await this.$axios.$post(`/api/blogs/image?id=${data.id}`, data.file);
        return result;
    },
    async deleteBlog({commit}, id) {
        const blog = await this.$axios.$delete(`/api/blogs/${id}`);
        return blog;
    },
    async updateBlog({commit}, data) {
        const obj = {...data};
        delete obj.id;
        
        const blog = await this.$axios.$put(`/api/blogs/${data.id}`, obj);
        return blog;
    },
};
