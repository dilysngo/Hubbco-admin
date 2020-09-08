
import types from'../../mutation-types';
async function getProducts({commit,state}, data) {
    try{
        const conditions = state.pagination;
        const fetchedData = await this.$axios.$get(`api/products/?keyword=${data.keyword || ''}&skip=${conditions.skip || 0}&limit=${conditions.limit || 10}`);
        commit(types.PRODUCTS_LIST, fetchedData.results);
        commit(types.PRODUCTS_PAGINATION, fetchedData.pagination);
        return fetchedData;
    }
    catch(e) {
        console.log(e);
    }
}
async function createProduct({commit, state}, data) {
    try{
        const fetchedData = await this.$axios.$post('api/products', data);
        return fetchedData;
    }
    catch(e) {
        console.log(e);
    }
}
async function getProductByID({commit, state}, data) {
    try{
        const fetchedData = await this.$axios.$get(`api/products/${data._id}`);
        if(fetchedData && fetchedData.id)
            return fetchedData;

        else
            this.errorText = 'Incorrect product';
    }
    catch(e) {
        console.log(e);
    }
}
async function getProductsByBrandId({commit, state}, data) {
    try{
        const fetchedData = await this.$axios.$get(`api/products/brand/${data._id}`);
        if(fetchedData && fetchedData.results) {
            commit('SET_DATA_PRODUCTS_BY_BRAND', fetchedData);
            return fetchedData;
        }

        else
            this.errorText = 'Incorrect product';
    }
    catch(e) {
        console.log(e);
    }
}
async function updateProduct({commit, state}, data) {
    try{
        const dataPut = {
            name:data.data.name,
            SKUCode:data.data.SKUCode,
            origin:data.data.origin,
            rangedIn:data.data.rangedIn,
            discription:data.data.discription,
            nutrition:data.data.nutrition,
            ingredients:data.data.ingredients,
            variations:data.data.variations,
            certifications:data.data.certifications,
            infoSection:data.data.infoSection,
            size:null
        };
        const fetchedData = await this.$axios.$put(`api/products/${data.id}`, dataPut);
        return fetchedData;
    }
    catch(e) {
        console.log(e);
    }
}
async function uploadAvatarProduct({commit, state}, data) {
    try{
        const formData = new FormData();
        formData.append('product', data.filesUploads);
        const fetchedData = this.$axios.$post(`/api/products/avatar/${data._id}`, formData,
            {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
        return fetchedData;
    }
    catch(e) {
        console.log(e);
    }
}
async function uploadImageProduct({commit, state}, data) {
    try{
        if(data.files && data.files.length) {
            data.files.forEach(o=>{
                const formData = new FormData();
                formData.append('product', o);
                this.$axios.$post(`api/products/upload/${data.idProduct}`, formData,
                    {
                        headers:{
                            'Content-Type':'multipart/form-data'
                        }
                    });
            });
        }
    }
    catch(e) {
        console.log(e);
    }
}
async function productDeleteByID({commit, state}, data) {
    try{
        const fetchedData = await this.$axios.$delete(`api/products/${data._id}`);
        if(fetchedData && fetchedData === true)
            commit(types.SET_DELETE_PRODUCT, data._id);
        else
            this.errorText = 'Incorrect product';
    }
    catch(e) {
        console.log(e);
    }
}
export default{
    productDeleteByID,
    uploadImageProduct,
    getProducts,
    createProduct,
    getProductByID,
    getProductsByBrandId,
    updateProduct,
    uploadAvatarProduct
};
