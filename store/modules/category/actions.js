import types from'../../mutation-types';

export default{
    async findCategories({commit}, conditions) {
        if(!conditions)
            conditions = {};
        const data = await this.$axios.$get(`/api/categories/?keyword=${conditions.keyword || ''}&skip=${conditions.skip || 0}&limit=${conditions.limit || 10}`);
        commit(types.CATEGORY_LISTCATE, data.results);
        commit(types.CATEGORY_PAGINATION, data.pagination);
        return data;
    },

    async createCategory({commit}, obj) {
        const data = await this.$axios.$post('/api/categories', obj);
        return data;
    },

    async updateCategory({commit}, conditions) {
        const obj = {...conditions};
        const id = obj.id;
        delete obj.id;
        const data = await this.$axios.$put(`/api/categories/${id}`, obj);
        return data;
    },

    async deleteCategory({commit}, id) {
        const data = await this.$axios.$delete(`/api/categories/${id}`);
        return data;
    },

    async getAllCategory({commit}, options) {
        if(!options)
            options = {};

        const result = await this.$axios.get(`api/category-products?&skip=${options.skip}&limit=${options.limit}`);
        commit(types.ALL_CATEGORY, result.data.results);
        return result.data.results;
    },
};
