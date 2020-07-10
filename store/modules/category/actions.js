import types from'../../mutation-types';

export default{
    async findCategories({commit}, conditions) {
        if(!conditions)
            conditions = {};
        const data = await this.$axios.$get(`/api/categories/?keyword=${conditions.keyword || ''}&skip=${conditions.skip || 0}&limit=${conditions.limit || 10}`);
        commit(types.CATEGORY_LISTCATE, data.results);
        commit(types.CATEGORY_PAGINATION, data.pagination);
        return data;
    }
};
