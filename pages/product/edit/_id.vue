<template>
    <div>
        <el-page-header
            @back="goBack"
            content="Product"
        />
        <div>
            <el-button
                style="float: right;"
                type="primary"
                @click="submitProduct()"
            >
                Save
            </el-button>
        </div>
        <el-form
            label-width="300px"
            style="margin-top: 20px;"
        >
            <el-form-item label="Supplier">
                <el-select
                    v-model="formDataProduct.supplierId"
                    clearable 
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Choose supplier"
                    :remote-method="remoteMethodSupplier"
                    :loading="loadingSupplier"
                >
                    <el-option
                        v-for="item in listSuppliers"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
        
            <el-form-item label="Brands">
                <el-select
                    v-model="formDataProduct.brandId"
                    clearable 
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Choose brand"
                    :remote-method="remoteMethodBrand"
                    :loading="loadingBrands"
                >
                    <el-option
              
                        v-for="item in allBrandsOfSupplier.results"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
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
                <no-ssr>
                    <vue-ckeditor
                        v-model="formDataProduct.discription"
                        :config="config"
                    />
                </no-ssr>
            </el-form-item>
            <el-form-item label="NUTRITION">
                <no-ssr>
                    <vue-ckeditor
                        v-model="formDataProduct.nutrition"
                        :config="config"
                    />
                </no-ssr>
            </el-form-item>
            <el-form-item
                label="INGREDIENTS
"
            >
                <no-ssr>
                    <vue-ckeditor
                        v-model="formDataProduct.ingredients"
                        :config="config"
                    />
                </no-ssr>
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
            <el-form-item label="PRODUCT VARIATIONS">
                <table>
                    <tr
                        v-for="(item, indexvariations) in formDataProduct.variations"
                        :key="indexvariations"
                    >
                        <td>
                            <el-input
                                v-if="status.variations.indexOf(indexvariations) > -1 "
                                style="margin-bottom: 8px;"
                                placeholder="Please input"
                                v-model="formDataProduct.variations[indexvariations]"
                            />
                            <span v-if="status.variations.indexOf(indexvariations) === -1 ">
                                {{ formDataProduct.variations[indexvariations] }}
                            </span>
                        </td>
                        <td style="padding-left: 15px;">
                            <div style="margin-bottom: 8px;">
                                <span
                                    v-if="status.variations.indexOf(indexvariations) === -1 "
                                    @click="showEditVariations(indexvariations)"
                                > <i class="el-icon-edit" /></span>  
                                <span @click="deleteItem(indexvariations, 'variations')">
                                    <i class="el-icon-delete" />
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-button
                             
                                @click="addNewVariation()"
                                type="primary"
                            >
                                ADD VARIATION
                            </el-button>
                        </td>
                    </tr>
                </table>
            </el-form-item>
            <el-form-item label="INFORMAION SECTION">
                <el-row
                    v-for="(item, indexinfoSection) in formDataProduct.infoSection"
                    :key="indexinfoSection"
                >
                    <el-col :span="12">
                        <div v-if="status.infoSection.indexOf(indexinfoSection) > -1 ">
                            <el-input
                                type="textarea"
                                autosize
                                placeholder="Title"
                                v-model="item.title"
                            />
                            <div style="margin: 20px 0;" />
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 5}"
                                placeholder="Enter your description"
                                v-model="item.description"
                            />
                        </div>
                        <div v-else>
                            <p>{{ item.title }}</p>
                            <p>{{ item.description }}</p>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div style="margin-bottom: 8px;    padding-left: 20px; ">
                            <span
                                v-if="status.infoSection.indexOf(indexinfoSection) === -1 "
                                @click="showEditInfoSection(indexinfoSection)"
                            > <i class="el-icon-edit" /></span>  
                            <span @click="deleteItem(indexinfoSection, 'infoSection')">
                                <i class="el-icon-delete" />
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="13">
                        <div>      <el-divider /></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="13">
                        <div>
                            <el-button
                             
                                @click="addNewIngredient()"
                                type="primary"
                            >
                                ADD A NEW INFORMAION SECTION
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item
                label="PRODUCT SIZING INFORMATION"
                v-if="formDataProduct.size && formDataProduct.size.length >2"
            >  
                <ul>
                    <li>
                        <el-input
                            v-show="status.size.width"
                            v-model="formDataProduct.size[0]"
                            style="    width: 100px;"
                            size="mini"
                        />
                        <span v-if="!status.size.width">{{ formDataProduct.size[0] }}</span>
                        WIDTH   <span
                            v-show="!status.size.width"
                            title="Edit"
                            @click="status.size.width =!status.size.width"
                        >
                            <i
                                class="fa fa-pencil"
                                aria-hidden="true"
                            />
                        </span>
                    </li>
                    <li>
                        <el-input
                            v-show="status.size.height"
                            v-model="formDataProduct.size[1]"
                            style="    width: 100px;"
                            size="mini"
                        />

                        <span v-if="!status.size.height"> {{ formDataProduct.size[1] }} </span>   HEIGHT <span
                            v-show="!status.size.height"
                            title="Edit"
                            @click="status.size.height =!status.size.height"
                        >
                            <i
                                class="fa fa-pencil"
                                aria-hidden="true"
                            />
                        </span>
                    </li>

                    <li>
                        <el-input
                            v-show="status.size.length"
                            v-model="formDataProduct.size[2]"
                            style="    width: 100px;"
                            size="mini"
                        />

                        <span v-if="!status.size.length">{{ formDataProduct.size[2] }}</span> LENGTH <span
                            v-show="!status.size.length"
                            title="Edit"
                            @click="status.size.length =!status.size.length"
                        >
                            <i
                                class="fa fa-pencil"
                                aria-hidden="true"
                            />
                        </span>
                    </li> 
                </ul>
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
        </el-form>
        <div>
            <el-button
                style="float: right;"
                type="primary"
                @click="submitProduct()"
            >
                Save
            </el-button>
        </div>
    </div>
</template>
<script>
import UploadImage from'~/components/uploadImages';
import{mapActions, mapState, mapGetters}from'vuex';
import CommonData from'~/utils/common-data';
import VueCkeditor from'vue-ckeditor2';
import _ from'lodash';
export default{
    components:{
        UploadImage,VueCkeditor
    },
    data() {
        
        return{
            CommonData,
           
            formDataProduct:{
                brand:null,
                supplierId:null,
                brandId:null,
                name:'',
                SKUCode:null,
                origin:null,
                rangedIn:null,
                discription:null,
                nutrition:null,
                ingredients:null,
                variations:[],
                certifications:[],
                category:[],
                infoSection:[],
                medias:[],
            
                variations:[],
                size:[0, 0, 0]
            },

            status:{
              
                name:true,
                sku:true,
                p_Origin:true,
                rIn:true,
                discription:false,
                nutrition:false,
                ingredients:false,
                variations:[],
                infoSection:[],
                size:{
                    width:false,
                    height:false,
                    length:false
                },
           
                categories:[true, true],
            },
            imageUrl:'',
            filesUpload:'',
            filesUploadSlider:[],
            loadingSupplier:false,
            loadingBrands:false,
            options:{
                page:1,
                limit:100,
                skip:0,
                total:0,
                keywork:''
            },
            config:{
                toolbar:[
                    {name:'font', items:[ 'Bold', 'Italic', 'Underline']}
                ],
                height:350,
                language:'en'
            },

        };
    },
    computed:{
        ...mapState({
            domainMedia:state=>state.domainMedia,
            filtersSupplier:state=>state.suppliers.filters
        }),
        ...mapGetters('suppliers', [
            'listSuppliers'
        ]),
        ...mapGetters('brands', ['allBrandsOfSupplier']),
        ...mapGetters('products', ['getProduct'])
    },
    async created() {
        const _this = this;
        if(this.$route.params && this.$route.params.id) {
            await _this.$store.dispatch(
                'products/getProductByID',
                {
                    _id:this.$route && this.$route.params && this.$route.params.id
                        ? this.$route.params.id
                        : null,
                }
            );
        }
        else{
            _this.getAllSuppliers();
        }
    },
    watch:{
        "getProduct":function() {
            const _this = this;
            this.formDataProduct = this.getProduct;
            
            let mapIdListSuppliers = _.map( _this.listSuppliers, function(o) {
                return o.id;
            });
            if(_.indexOf(mapIdListSuppliers, this.formDataProduct.brand.supplier.id) === -1){
                _this.listSuppliers =  _.cloneDeep(_this.listSuppliers.push(this.formDataProduct.brand.supplier)) ;
            }
              
            if(this.allBrandsOfSupplier && this.allBrandsOfSupplier.results ){
                this.allBrandsOfSupplier.results =  this.allBrandsOfSupplier.results.push(this.formDataProduct.brand) ;
            }
          
        },
        "formDataProduct.supplierId":function() {
            this.querySupplier();
        },
    },
    methods:{

        showEditInfoSection(index) {
            const _this = this;
            _this.status.infoSection.push(index);
        },
        addNewIngredient() {
            const _this = this;
            const _newItem = {
                title:'',
                description:'',
            };

            _this.formDataProduct.infoSection.push(_newItem);
            _this.status.infoSection.push(
                _this.formDataProduct.infoSection.length - 1
            );
        },
        addNewVariation() {
            const _this = this;
            const _newItem = '';
            _this.formDataProduct.variations.push(_newItem);
            _this.status.variations.push(
                _this.formDataProduct.variations.length - 1
            );
        },
        deleteItem(index, type) {
            const _this = this;
            switch(type) {
            case'variations':
                _this.formDataProduct.variations.splice(index, 1);
                break;
            case'infoSection':
                _this.formDataProduct.infoSection.splice(index, 1);
                break;

            default:
            }
        },
        showEditVariations(index) {
            const _this = this;
            _this.status.variations.push(index);
        },
        
        async querySupplier(){
            const _this = this;
            if(this.formDataProduct && this.formDataProduct.supplierId )    {
                
                await  this.getAllbrandsOfSupplier(
                    {
                        id:this.formDataProduct.supplierId,
                        skip:this.options.skip,
                        limit:this.options.limit,
                        keyword:this.options.keywork
                    }
                );
            }
            else{
                _this.allBrandsOfSupplier.results = [];
                _this.formDataProduct.brandId = null;
            }   
        
        },
        async remoteMethodSupplier(query) {
            const _this = this;
 
            if(query) {
                this.loading = true;
                setTimeout(()=>{
                    _this.filtersSupplier.keywork = _.cloneDeep(query) ;
                    this.getAllSuppliers(); 
    
                }, 200);
            }
        },
        async remoteMethodBrand(query) {
            const _this = this;
   
            if(query) {
          
                this.loading = true;
                setTimeout(()=>{
                    console.log(query);
                    this.options.keywork = _.cloneDeep(query) ;
                    
                    this.querySupplier();
    
                }, 200);
            }
        },
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
            this.$router.push({path:'/product'});
        },
        async submitProduct() {
            const _this = this;
            console.log("hello");
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
                    this.goBack();
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
       
        },
        ...mapActions('products', ['createProduct','getProductByID','updateProduct','uploadAvatarProduct','uploadImageProduct']),
        ...mapActions('suppliers',['getAllSuppliers']),
        ...mapActions('brands', ['getAllbrandsOfSupplier'])
    
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