import types from'../../mutation-types';

export default{
    async findMedias({commit}, conditions) {
        if(!conditions)
            conditions = {};
        const data = await this.$axios.$get(`/api/media/?keyword=${conditions.keyword || ''}&skip=${conditions.skip || 0}&limit=${conditions.limit || 10}`);
        commit(types.MEDIA_LIST, data.results);
        commit(types.MEDIA_PAGINATION, data.pagination);
        return data;
    },

    async uploadMedia({commit}, file) {
        if(!file)
            return;
        const result = await this.$axios.$post(`/api/media/upload`, file);
        return result;
    },

    async deleteMedia({commit}, id) {
        const media = await this.$axios.$delete(`/api/media/${id}`);
        return media;
    },
};
