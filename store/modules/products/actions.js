
import types from'../../mutation-types';
async function getProducts({commit,state}, data) {
    try{
        console.log(state.pagination);
        const conditions = state.pagination;
        const data = await this.$axios.$get(`api/products/?keyword=${conditions.keyword || ''}&skip=${conditions.skip || 0}&limit=${conditions.limit || 10}`);
        commit(types.PRODUCTS_LIST, data.results);
        commit(types.PRODUCTS_PAGINATION, data.pagination);
        return data;
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
        // const fetchedData = await this.$axios.$post(`api/products/upload/${data.id}`);
        const formData = new FormData();
        formData.append('product', data.filesUploads);
        const fetchedData = this.$axios.$post(`api/products/upload/${data._id}`, formData,
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

export default{
    getProducts,
    createProduct,
    getProductByID,
    updateProduct,
    uploadAvatarProduct
};
