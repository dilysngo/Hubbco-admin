import types from"../../mutation-types.js";
import{data}from"jquery";

export default{
    async createKeyword({commit}, data) {
        const result = await this.$axios.post("/api/trendingKeywords/", data);
        return result;
    },
    async updateKeyword({commit}, option) {
        const result = await this.$axios.put(
            `/api/trendingKeywords/${option.id}`,
            option.data
        );
        return result;
    },
    async deleteKeyword({commit}, option) {
        const result = await this.$axios.delete(
            `/api/trendingKeywords/${option.id}`,
            option.data
        );
        if(result)
            commit(types.KEYWORD_DELETED_ID, option.id);
        return result;
    },
    async getAllKeywords({commit}, conditions) {
        if(!conditions)
            conditions = {};
        const data = await this.$axios.$get(`/api/trendingKeywords?keyword=${conditions.keyword}&skip=${conditions.skip || 0}&limit=${conditions.limit || 10}`);
        commit(types.ALL_KEYWORDS, data.results);
        commit(types.KEYWORDS_PAGINATION, data.pagination);
        return data;
    }
};
