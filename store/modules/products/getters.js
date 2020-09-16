
import _ from'lodash';
const getProduct = (state, getters, rootState)=>{
    let data = _.cloneDeep(state.product);
    if(state.product) {
        data.brandId = data.brand && data.brand.id ? data.brand.id : null;
        data.supplierId =  data.brand && data.brand.supplier ? data.brand.supplier.id : null;
    }
  
    return data;
};
export default{
    getProduct,
    listProduct:state=>state.listProduct,
    pagination:state=>state.pagination,
};
