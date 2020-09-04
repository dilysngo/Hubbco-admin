import types from"../../mutation-types.js";
import{data}from"jquery";

export default{
    async createBrand({commit}, data) {
        const result = await this.$axios.post("/api/brands/", data);
        return result;
    },
    async updateBrand({commit}, option) {
        const result = await this.$axios.put(
            `/api/brands/${option.id}`,
            option.data
        );
        return result;
    },
    async getBrandById({commit}, id) {
        const result = await this.$axios.get(`/api/brands/${id}`);
        return result;
    },
    async deleteBrand({commit}, option) {
        const result = await this.$axios.delete(
            `/api/brands/${option.id}`,
            option.data
        );
        if(result)
            commit(types.BRAND_DELETED_ID, option.id);
        return result;
    },
    async uploadBannerBrand({commit}, option) {
        const data = await this.$axios.post(
            `/api/brands/background?id=${option.id}`,
            option.formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        );
        return data;
    },
    async uploadAvatarBrand({commit}, option) {
        const data = await this.$axios.post(
            `/api/brands/avatar?id=${option.id}`,
            option.formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        );
        return data;
    },
    async uploadIntroBrand({commit}, option) {
        const data = await this.$axios.post(
            `/api/media/upload/brand/${option.id}`,
            option.formData,
            {
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            }
        );
        return data;
    },
    async getBrandList({commit}, conditions) {
        if(!conditions)
            conditions = {};
        const data = await this.$axios.$get(`/api/brands?keyword=${conditions.keyword}&skip=${conditions.skip || 0}&limit=${conditions.limit || 10}`);
        commit(types.ALL_BRANDLIST, data.results);
        commit(types.BRAND_PAGINATION, data.pagination);
        return data;
    },
    async getBrandByCategories({commit}, options) {
        if(!options) options = {};

        const data = await this.$axios.$get(
            `/api/brands/category/${options.id}?keyword=${
                options.keyword
            }&skip=${options.skip}&limit=${options.limit}`
        );
        commit(types.BRAND_BY_CATEGORIES, data.results);
        return data;
    },

    async getAllbrandsOfSupplier({commit}, options) {
        const data = await this.$axios.$get(
            `/api/brands/supplier/${options.id}?${options.keyword}&skip=${
                options.skip
            }&limit=${options.limit}`
        );
        commit(types.ALL_BRANDS_OF_SUPPLIER, data);
    },

    async getProductByBrand({commit}, options) {
        if(!options) options = {};

        const data = await this.$axios.$get(
            `/api/products/brand/${options.id}?keyword=${options.keyword}&skip=${
                options.skip
            }&limit=${options.limit}`
        );
        commit(types.PRODUCT_BY_BRAND, data.results);
        return data;
    },

    async getBrandListByArraySupplier({commit}, conditions) {
        if(!conditions)
            conditions = {};
        const data = await this.$axios.$get(`/api/brands/supplier/arr?${conditions.ids === '[]' ? '' : 'ids=' + conditions.ids}&keyword=${conditions.keyword}&skip=${conditions.skip || 0}&limit=${conditions.limit || 10}`);
        commit(types.ALL_BRANDLIST, data.results);
        commit(types.BRAND_PAGINATION, data.pagination);
        return data;
    },

    async getAllSuppliers({commit}, options) {
        if(!options) options = {};

        const data = await this.$axios.$get(
            `/api/suppliers?keyword=${options.keyword}&skip=${
                options.skip || 0
            }&limit=${options.limit || 10}`
        );
        return data.results;
    }
};
