import types from'../../mutation-types';

export default{
    async findProvider({commit}, conditions) {
        if(!conditions)
            conditions = {};

        const data = await this.$axios.$get(`/api/providers?keyword=${conditions.keyword || ''}&skip=${conditions.skip || ''}&limit=${conditions.limit || ''}`);
        commit(types.PROVIDER_LIST, data.results);
        commit(types.PROVIDER_PAGINATION, data.pagination);
        return data;
    },
};

