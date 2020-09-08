import actions from'./actions';
import getters from'./getters';
import mutations from'./mutations';

export default{
    namespaced:true,
    state:()=>({
        brandId:null,
        allBrandList:null,
        brandPagination:null,
        brandByCategories:null,
        allBrandsOfSupplier:[],
        productByBrand:null,
        brandDeletedId:null
    }),
    getters,
    actions,
    mutations
};
