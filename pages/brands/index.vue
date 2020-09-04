<template>
    <section class="template-post">
        <div class="page-header">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="page-title">
                        Post
                    </h2>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                    <nuxt-link
                        to="/brands/brand-detail/"
                        class="btn-normal"
                    >
                        New Post
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="page-container">
                <div class="page-filter">
                    <ul class="filter-sub">
                        <li class="item">
                            All Posts
                            <span class="item-value">
                                ({{ total }})
                            </span>
                        </li>
                    </ul>
                    <el-form
                        :model="formSearch"
                        ref="form"
                        :inline="true"
                    >
                        <el-form-item label="Supplier">
                            <el-select
                                v-model="formSearch.suppliersId"
                                multiple
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Please enter a keyword"
                                :remote-method="remoteMethod"
                                :loading="loading"
                            >
                                <el-option
                                    v-for="item in supplierList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Keyword">
                            <el-input v-model="formSearch.keyword" />
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="search"
                            >
                                Search
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="page-list">
                    <div class="row row-label">
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Brand Name
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Origin
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Categories
                            </span>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <span class="txt-label">
                                Bio
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Create Date
                            </span>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Actions
                            </span>
                        </div>
                    </div>
                    <div class="list-item">
                        <div
                            class="row row-item"
                            v-for="(item, index) in allBrandList"
                            :key="index"
                        >
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.name }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.origin }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.categoryProducts.length }}
                                </h3>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.bio }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.createdAt| moment }}
                                </h3>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <button
                                    class="item-btn btn-view"
                                    @click="editBrand(item)"
                                >
                                    <span class="icon-edit" />
                                </button>
                                <button
                                    class="item-btn btn-view"
                                    @click="onDelete(item)"
                                >
                                    <span class="icon-delete" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="paginate">
                    <pagination
                        id="pagination"
                        :skip="skip"
                        :limit="limit"
                        :total="total" 
                        @change="changePage"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Swal from'sweetalert2';
import Pagination from"~/components/Pagination";
import{pagination}from'~/helpers/dataHelper';
import{mapGetters, mapActions}from"vuex";
import moment from"moment";

export default{
    middleware:['authentication'],
    data() {
        return{
            formSearch:{
                keyword:"",
                suppliersId:[]
            },
            supplierList:[],
            page:1,
            limit:10,
            skip:0,
            total:0,
            timeOut:null,
            loading:false
        };
    },
    components:{
        Pagination,
    },
    computed:{
        ...mapGetters('brands', ['allBrandList','brandPagination'])
    },

    async created() {
        await this.search();
    },
    methods:{
        ...mapActions('brands', ['getBrandListByArraySupplier','deleteBrand','getAllSuppliers']),
        ...mapActions('products', ['getProductsByBrandId']),
        async search() {
            await this.getBrands();
            this.total = this.brandPagination && this.brandPagination.total;
        },
        async getBrands() {
            await this.getBrandListByArraySupplier({keyword:this.formSearch.keyword, limit:this.limit, skip:this.skip, ids:`[${this.formSearch.suppliersId.toString()}]`}).catch(err=>{
                console.log(err);
            });
        },
        async onDelete(brand){
            let countProduct = null;
            const fetchData = await this.getProductsByBrandId({_id:brand.id}).catch(err=>{
                console.log(err);
            });
            if(fetchData && fetchData.results)
                countProduct = fetchData.results.length;
            if(countProduct === 0) {
                this.$confirm('Are you sure delete this brand ?', 'Warning', {
                    confirmButtonText:'OK',
                    cancelButtonText:'Cancel',
                    type:'warning'
                }).then(()=>{
                    this.removeBrand(brand.id);
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'Delete canceled'
                    }); 
                });
            }
            else
                this.$alert('You need delete the product of this brand first.', 'Warning', {type:'warning'});
        },
        async removeBrand(brandId) {
            const result = await this.deleteBrand({id:brandId});
            if(result) {
                this.$message({
                    type:'success',
                    message:'Delete brand completed'
                });
            }
        },
        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getBrands();
        },
        editBrand(data) {
            this.$router.push(`/brands/brand-detail/${data.id}`);
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
            this.loading = false;
            this.supplierList = await this.getAllSuppliers({keyword:query, skip:0, limit:10});
            console.log(this.supplierList);
        }
    },
    filters:{
        moment(date) {
            return moment(date).format('DD-MM-YYYY');
        }
    }
};
</script>

