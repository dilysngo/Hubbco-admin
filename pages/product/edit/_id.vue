<template>
    <div>
        <el-page-header
            @back="goBack"
            content="Product"
        />
        <el-form
            label-width="200px"
            style="margin-top: 20px;"
        >
            <el-form-item label="Procduct name">
                <el-input v-model="formDataProduct.name" />
            </el-form-item>
            <el-form-item label="SKU">
                <el-input v-model="formDataProduct.SKUCode" />
            </el-form-item>
            <el-form-item label="PRODUCT ORIGIN">
                <el-input v-model="formDataProduct.origin" />
            </el-form-item>
            <el-form-item label="RANGED IN">
                <el-input v-model="formDataProduct.rangedIn" />
            </el-form-item>
            <el-form-item label="PRODUCT DISCRIPTION">
                <el-input
                    type="textarea"
                    v-model="formDataProduct.discription"
                />
            </el-form-item>
            <el-form-item label="NUTRITION">
                <el-input
                    type="textarea"
                    v-model="formDataProduct.nutrition"
                />
            </el-form-item>
            <el-form-item
                label="INGREDIENTS
"
            >
                <el-input
                    type="textarea"
                    v-model="formDataProduct.ingredients"
                />
            </el-form-item>
            <el-form-item label="CERTIFICATIONS">
                <el-checkbox-group v-model="formDataProduct.certifications">
                    <el-checkbox
                        v-for="item in CommonData.cartificationsList"
                        :key="item.id"
                        :label="item.id"
                    >
                        <span>  {{ item.name }}</span>
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
   
            <el-form-item label="Avatar">
                <div
                    class="avatar-uploader"
                    @click="chooseFile"
                >
                    <div
                        tabindex="0"
                        class="el-upload el-upload--text"
                    >
                        <img
                            v-if="imageUrl"
                            :src="imageUrl"
                            class="avatar"
                        >
                        <img
                            v-else-if="formDataProduct && formDataProduct.avatar" 
                            :src="domainMedia + formDataProduct.avatar"
                            class="avatar"
                        >
                       
                        <i
                            v-else
                            class="el-icon-plus avatar-uploader-icon"
                        />
                   
                        <input
                            style="display: none;"
                            type="file"
                            id="file"
                            ref="file"
                            @change="onFileSelected"
                        >
                    </div>
                </div>   
            </el-form-item>
            <el-form-item label="Images product">
                <UploadImage
                    :current="formDataProduct.medias"
                    @imageUpload="fileUpload"
                />
            </el-form-item>
     
            <el-form-item style="float: right;"> 
                <el-button
                    type="primary"
                    @click="submitProduct"
                >
                    Save
                </el-button>
                <!-- <el-button>Cancel</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import UploadImage from'~/components/uploadImages';
import{mapActions, mapState, mapGetters}from'vuex';
import CommonData from'~/utils/common-data';
export default{
    components:{
        UploadImage
    },
    data() {
        
        return{
            CommonData,
            formDataProduct:{
                name:'',
                SKUCode:null,
                origin:null,
                rangedIn:null,
                brandId:1,
                discription:null,
                nutrition:null,
                ingredients:null,
                variations:[],
                certifications:[],
                category:[],
                infoSection:[],
                medias:[],
            },
            imageUrl:'',
            filesUpload:'',
            filesUploadSlider:[],

        };
    },
    computed:{
        ...mapState({
            domainMedia:state=>state.domainMedia,
        }),

    },
    async created() {
        const _this = this;

        // await this.getProductByID();
        // await this.getAllCategoryProducts();
        if(this.$route.params && this.$route.params.id) {
            _this.formDataProduct = await _this.$store.dispatch(
                'products/getProductByID',
                {
                    _id:this.$route && this.$route.params && this.$route.params.id
                        ? this.$route.params.id
                        : null,
                }
            );
        }
        // if(this.$route && this.$route.query && this.$route.query.brandId) {
        //     const result = await this.getBrandById(this.$route.query.brandId);
        //     if(result && result.status && result.status === 200)
        //         _this.formDataProduct.brand = result.data;
        // }

    // this.dataProductEditor.categories = _allCategories || [];
    },
    methods:{
        ...mapActions('products', ['createProduct','getProductByID','updateProduct','uploadAvatarProduct','uploadImageProduct']),
        fileUpload(val) {
            this.filesUploadSlider = val;
        },
        chooseFile() {
            this.$refs.file.click();
        },
        onSubmit() {
            console.log('submit!');
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
        },
        onFileSelected(event) {
            var size = parseFloat(this.$refs.file.files[0].size / 1024).toFixed(2);
            this.filesUpload = this.$refs.file.files[0];
            if(this.filesUpload) {
                var reader = new FileReader();
                reader.onload = (e)=>{
                    this.imageUrl = e.target.result;
                };
                reader.readAsDataURL(this.filesUpload);
            }
            else{
                this.filesUpload = null;
            }
        },
        goBack() {
            console.log('go back');
        },
        async submitProduct() {
            const _this = this;
            // await _this.$validator.validateAll().then(async (result)=>{
            //     if(result) {
            try{
                let fetchedData = null;
                if(this.$route.params && this.$route.params.id) {
                    fetchedData = await this.updateProduct({
                        id:this.$route.params.id,
                        data:_this.formDataProduct
                    });
                    this.uploadAvatar(this.$route.params.id);
                    if(_this.filesUploadSlider && _this.filesUploadSlider.length > 0){
                        await this.uploadImageProduct({
                            files:_this.filesUploadSlider,
                            idProduct:this.$route.params.id,
                        });
                    }
               
                }
                else{
                    fetchedData = await _this.createProduct(_this.formDataProduct);
                    if(fetchedData && fetchedData.id ){
                        this.uploadAvatar(fetchedData.id);
                        if(_this.filesUploadSlider && _this.filesUploadSlider.length > 0){
                            await this.uploadImageProduct({
                                files:_this.filesUploadSlider,
                                idProduct:fetchedData.id,
                            });
                        }
                     
                    }
               
                }
              
                if(fetchedData) {
                    this.$notify.success({
                        title:'Success',
                        message:'This is a success message',
                        offset:100,
                    });
                }
                else{
                    this.$notify({
                        title:'Warning',
                        message:fetchedData.message,
                        type:'warning',
                    });
                }
            }
            catch{
                this.$notify({
                    title:'Warning',
                    message:'This is a warning message',
                    type:'warning',
                });
            }
        },
        uploadAvatar(id){
            const _this = this;
            if(this.filesUpload ){
                _this.uploadAvatarProduct(
                    {
                        _id:id,
                        filesUploads:this.filesUpload
                    }
                );
            }
       
        }
    
    }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>