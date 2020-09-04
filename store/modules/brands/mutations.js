import types from'../../mutation-types';

export default{
    [types.ALL_BRANDLIST](state, allBrandList) {
        state.allBrandList = allBrandList;
    },
    [types.BRAND_PAGINATION](state, brandPagination) {
        state.brandPagination = brandPagination;
    },
    [types.BRAND_BY_CATEGORIES](state, brandByCategories) {
        state.brandByCategories = brandByCategories;
    },
    [types.ALL_BRANDS_OF_SUPPLIER](state, allBrandsOfSupplier) {
        state.allBrandsOfSupplier = allBrandsOfSupplier;
    },
    [types.PRODUCT_BY_BRAND](state, productByBrand) {
        state.productByBrand = productByBrand;
    },
    [types.BRAND_DELETED_ID](state, id) {
        debugger;
        state.allBrandList = state.allBrandList.filter(item=>item.id !== Number(id));
    }
};
