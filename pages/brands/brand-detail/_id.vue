<template>
    <div>
        <el-page-header
            @back="goBack"
            :content="$route.params.id ? 'Edit Brand' : 'Create Brand'"
        />
        <el-form
            ref="form"
            :model="brandInfo"
            label-width="180px"
            style="margin-top: 20px;"
        >
            <el-form-item
                label="Supplier"
                v-if="!$route.params.id"
            >
                <el-select
                    v-model="brandInfo.supplierId"
                    clearable 
                    filterable
                    remote
                    reserve-keyword
                    placeholder="Choose supplier"
                    :remote-method="remoteMethod"
                    :loading="loadingSupplier"
                    id="supplierId"
                    name="supplierId"
                    :class="{'has-error': errors && errors.firstRule('supplierId') === 'required'}"
                    v-validate="'required'"
                >
                    <el-option
                        v-for="item in supplierList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
                <div
                    v-if="errors && errors.firstRule('supplierId') === 'required'"
                    class="text-error text-red"
                >
                    Supplier is not empty.
                </div>
            </el-form-item>
            <el-form-item label="Brand name">
                <el-input
                    v-model="brandInfo.brandName"
                    placeholder="Brand Name"
                    :class="{'has-error': errors && errors.firstRule('brandName') === 'required'}"
                    id="brandName"
                    name="brandName"
                    v-validate="'required'"
                />
                <div
                    v-if="errors && errors.firstRule('brandName') === 'required'"
                    class="text-error text-red"
                >
                    Brand name is not empty.
                </div>
            </el-form-item>
            <el-form-item label="Brand origin">
                <el-input
                    v-model="brandInfo.brandOrigin"
                    placeholder="Country"
                    :class="{'has-error': errors && errors.firstRule('brandOrigin') === 'required'}"
                    id="brandOrigin"
                    name="brandOrigin"
                    v-validate="'required'"
                />
                <div
                    v-if="errors && errors.firstRule('brandOrigin') === 'required'"
                    class="text-error text-red"
                >
                    Brand origin is not empty.
                </div>
            </el-form-item>
            <el-form-item label="Brand bio">
                <el-input
                    type="textarea"
                    :rows="5"
                    v-model="brandInfo.brandBio"
                    placeholder="Bio description"
                    :class="{'has-error': errors && errors.firstRule('brandBio') === 'required'}"
                    id="brandBio"
                    name="brandBio"
                    v-validate="'required'"
                />
                <div
                    v-if="errors && errors.firstRule('brandBio') === 'required'"
                    class="text-error text-red"
                >
                    Brand bio is not empty.
                </div>
            </el-form-item>
            <el-form-item label="Brand origin">
                <el-input v-model="brandInfo.brandOrigin" />
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Brand avatar">
                        <label
                            for="fileProfileAvatar"
                            :class="brandInfo.hasAvatar ? '' : 'el-upload el-upload--picture-card avatar'"
                        >
                            <el-image
                                style="width: 200px; height: 200px; cursor: pointer;"
                                :src="brandInfo.brandAvatar"
                                fit="cover"
                                title="Upload avatar"
                            >
                                <div
                                    slot="placeholder"
                                    class="image-slot"
                                >
                                    Loading<span class="dot">...</span>
                                </div>
                            </el-image>
                        </label>
               
                        <input
                            id="fileProfileAvatar"
                            ref="fileProfileAvatar"
                            hidden
                            type="file"
                            @change="changeProfileAvatar($event)"
                        >
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="Brand background">
                        <label
                            for="fileProfileBackground"
                            :class="brandInfo.hasBackground ? '' : 'el-upload el-upload--picture-card background'"
                        >
                            <el-image
                                style="width: 400px; height: 200px; cursor: pointer;"
                                :src="brandInfo.brandBackground"
                                fit="cover"
                                title="Upload background"
                            >
                                <div
                                    slot="placeholder"
                                    class="image-slot"
                                >
                                    Loading<span class="dot">...</span>
                                </div>
                            </el-image>
                        </label>
                        <input
                            id="fileProfileBackground"
                            ref="fileProfileBackground"
                            hidden
                            type="file"
                            @change="changeProfileBackground($event)"
                        >
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-form-item
                label="Brand Intro"
                v-if="isLoading"
            >
                <upload-images-videos
                    :current-list-url="brandInfo.medias"
                    @mediaUpload="changeProfileMediaBrand"
                />
            </el-form-item>

            <el-form-item label="Brand categories">
                <div class="brand-categories">
                    <ul v-if="brandCategoriesDisplay.length > 0">
                        <li
                            v-for="item in brandCategoriesDisplay"
                            :key="item.id"
                        >
                            <span>
                                <el-button round>
                                    {{ item.name }}
                                </el-button>
                            </span>
                        </li>
                        <span
                            title="Edit"
                            @click="chosseCategories()"
                        >
                            <i
                                class="fa fa-pencil"
                                aria-hidden="true"
                            />
                        </span>
                    </ul>
                    <el-button
                        v-else
                        round
                        plain
                        type="warning"
                        size="mini"
                        @click="chosseCategories()"
                    >
                        Select Category
                    </el-button>
                    <div
                        v-show="errorCaterories"
                        class="text-error text-red has-error"
                    >
                        Categories is not empty.
                    </div>
                </div>
            </el-form-item>
            <el-form-item> 
                <el-button
                    type="primary"
                    @click="saveAsPublish"
                >
                    {{ $route.params.id ? 'Save brand' : 'Create brand' }}
                </el-button>
            </el-form-item>
        </el-form>
        <PopupSelectCategories
            id="popupCategories"
            ref="popupCategories"
            :list-caterogies-selected="brandInfo.brandCategories"
            @save="handleSaveCategory"
        />
    </div>
</template>
<script>
import _ from'lodash';
import{mapGetters, mapActions}from'vuex';
import{convertToUrl}from'~/helpers/dataHelper';
import UploadImagesVideos from'~/components/brands/UploadImagesVideos';
import PopupSelectCategories from'~/components/brands/PopupSelectCategories';

export default{
    middleware:['authentication'],
    components:{
        UploadImagesVideos,
        PopupSelectCategories
    },
    data() {
        return{
            brandInfo:{
                brandId:this.$route.params.id ? Number(this.$route.params.id) : null,
                supplierId:null,
                brandName:'Brand name',
                brandAvatar:'/images/photoDefault/noImage_brand.png',
                brandOrigin:'AUSTRALIA',
                brandBackground:'/images/photoDefault/noImage_cover.png',
                brandBio:'',
                brandCompany:null,
                brandCategories:[],
                medias:[],
                hasAvatar:false,
                hasBackground:false
            },
            formDataAvatar:null,
            formDataBackground:null,
            formDataMedias:null,
            isLoading:true,
            errorCaterories:false,
            supplierList:[],
            loadingSupplier:false,
            brandCategoriesDisplay:[]
        };
    },
    async created() {
        this.getInfoBrand();
    },
    methods:{
        ...mapActions('brands', ['getBrandById','uploadAvatarBrand','uploadBannerBrand','uploadIntroBrand','getAllSuppliers','updateBrand','createBrand']),
        async getInfoBrand() {
            if(this.$route.params.id) {
                this.isLoading = false;
                const result = await this.getBrandById(this.$route.params.id);
                if(result.data) {
                    this.brandInfo.brandName = result.data.name || '';
                    this.brandInfo.brandOrigin = result.data.origin || '';
                    this.brandInfo.brandAvatar = result.data.avatar || null;
                    this.brandInfo.brandBackground = result.data.background || null;
                    this.brandInfo.brandBio = result.data.bio || '';
                    this.brandInfo.brandCategories = result.data.categoryProducts || [];
                    this.brandInfo.medias = JSON.parse(JSON.stringify(result.data.medias)) || [];
                    this.brandInfo.brandAvatar = result.data.avatar ? `${this.convertUrlImage(result.data.avatar)}` : '/images/photoDefault/noImage_brand.png';
                    this.brandInfo.brandBackground = result.data.background ? `${this.convertUrlImage(result.data.background)}` : '/images/photoDefault/noImage_cover.png';
                    this.brandInfo.hasAvatar = result.data.avatar ? true : false;
                    this.brandInfo.hasBackground = result.data.background ? true : false;
                    this.isLoading = true;
                }
                this.formDataAvatar = null;
                this.formDataBackground = null;
                this.formDataMedias = null;
                this.formatBrandDisplay();
            }
        },
        async remoteMethod(query) {
            if(query) {
                this.loading = true;
                setTimeout(()=>{
                    this.getSuppliers(query); 
                }, 200);
            }
            else{
                this.supplierList = [];
            }
        },
        async getSuppliers(query) {
            this.loadingSupplier = false;
            this.supplierList = await this.getAllSuppliers({keyword:query, skip:0, limit:10});
        },
        async changeProfileAvatar(event) {
            const i = event.target;
            if(i.files && i.files[0]) {
                if(!this.checkSizeUpload(i.files)) {
                    this.$notify.error({
                        title:'Error',
                        message:'Image size is too large.',
                    });
                    return;
                }
                this.formDataAvatar = new FormData();
                this.formDataAvatar.append('hubbco-img', i.files[0]);
                const reader = new FileReader();
                reader.onload = (e)=>{
                    this.brandInfo.brandAvatar = e.target.result;
                };
                reader.readAsDataURL(i.files[0]);
                document.getElementById('fileProfileAvatar').value = '';
            }
        },
        async changeProfileBackground(event) {
            const i = event.target;
            if(i.files && i.files[0]) {
                if(!this.checkSizeUpload(i.files)) {
                    this.$notify.error({
                        title:'Error',
                        message:'Image size is too large.',
                    });
                    return;
                }
                this.formDataBackground = new FormData();
                this.formDataBackground.append('hubbco-img', i.files[0]);
                const reader = new FileReader();
                reader.onload = (e)=>{
                    this.brandInfo.brandBackground = e.target.result;
                };
                reader.readAsDataURL(i.files[0]);
                document.getElementById('fileProfileBackground').value = '';
            }
        },
        async changeProfileMediaBrand(val) {
            if(val && val[0]) {
                this.formDataMedias = new FormData();
                this.formDataMedias.append('media', val[0]);
            }
        },
        chosseCategories() {
            const _setBefore = this.brandInfo.brandCategories;
            this.categoriesBefore = _setBefore;
            this.$refs.popupCategories.open(this.brandInfo.brandCategories);
        },
        handleSaveCategory(newCategory) {
            this.brandInfo.brandCategories = [];
            this.brandCategoriesDisplay = [];
            this.brandInfo.brandCategories = newCategory;
            this.errorCaterories = false;
            this.formatBrandDisplay();
        },
        goBack() {
            this.$router.push({path:'/brands/'});
        },
        convertUrlImage(url) {
            return convertToUrl(url);
        },
        checkSizeUpload(file) {
            const _this = this;
            let canUpload = true;
            const sizeMax = 1024 * 1024 * 3; // 2MB
            let totalSize = 0;
            const fileUpload = _.cloneDeep(_this.fileUpload);
            _.forEach(
                _.filter(file, (v)=>{
                    return _.indexOf(_this.validTypes, v.type) > -1;
                }),
                (o)=>{
                    fileUpload.push(o);
                }
            );
            _.forEach(fileUpload, (o)=>{
                const size = o.size;
                totalSize = totalSize + ize;
                if(totalSize > sizeMax) {
                    canUpload = false;
                    return false;
                }
            });
            return canUpload;
        },
        async saveAsPublish() {
            const validate = await this.$validator.validateAll();
            if(!validate || this.brandInfo.brandCategories.length === 0) {
                this.errorCaterories = this.brandInfo.brandCategories.length === 0;
                this.$nextTick(()=>{
                    this.$el.querySelector('.has-error').scrollIntoView(false);
                });
                return;
            }
            let data = {
                name:this.brandInfo.brandName,
                origin:this.brandInfo.brandOrigin,
                bio:this.brandInfo.brandBio,
                brandIntro:null,
                categoryProducts:this.brandInfo.brandCategories
            };
            if(this.brandInfo.brandId) {
                const result = await this.updateBrand({id:this.brandInfo.brandId, data:data}).catch(err=>{
                    console.log(err);
                });
                this.uploadDataByFormData();
                if(result) {
                    this.$notify({
                        title:'Update Brand success',
                        type:'success'
                    });
                }
                this.$router.push({path:'/brands'});
            }
            else{
                data = Object.assign(data, {supplierId:this.brandInfo.supplierId});
                const result = await this.createBrand(data).catch(err=>{
                    console.log(err);
                });
                this.brandInfo.brandId = result.data.id;
                if(this.brandInfo.brandId)
                    this.uploadDataByFormData();

                this.$notify({
                    title:'Create Brand success',
                    type:'success'
                });
                this.$router.push({path:'/brands'});
            }
        },
        async uploadDataByFormData() {
            if(this.formDataBackground) {
                await this.uploadBannerBrand({id:this.brandInfo.brandId, formData:this.formDataBackground}).catch(e=>{
                    console.log(e);
                });
            }

            if(this.formDataAvatar) {
                await this.uploadAvatarBrand({id:this.brandInfo.brandId, formData:this.formDataAvatar}).catch(e=>{
                    console.log(e);
                });
            }
            if(this.formDataMedias) {
                await this.uploadIntroBrand({id:this.brandInfo.brandId, formData:this.formDataMedias}).catch(e=>{
                    console.log(e);
                });
            }
        },
        formatBrandDisplay() {
            if(this.brandInfo.brandCategories.length === 0) {
                this.brandCategoriesDisplay = [];
                return;
            }
            for(const item of this.brandInfo.brandCategories) {
                if(!item.parentId) {
                    const temp = this.brandInfo.brandCategories.find(e=>e.parentId === item.id);
                    if(temp !== undefined)
                        this.brandCategoriesDisplay.push(temp);
                    else
                        this.brandCategoriesDisplay.push(item);
                }
            }
        }
    },
};
</script>

