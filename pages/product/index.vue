<template>
    <div class="template-post template-product">
        <div class="page-header">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="page-title">
                        Product
                    </h2>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                    <nuxt-link
                        to="/product/edit"
                        class="btn-normal"
                    >
                        New Product
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="page-container">
                <div class="page-filter">
                    <div class="row align-items-center">
                        <div class="col-xl-4 col-lg-5 col-md-5 col-sm-12">
                            <ul class="filter-sub">
                                <li class="item">
                                    All Packages  
                                    <span
                                        class="item-value"
                                        v-if="pagination"
                                    >
                                        {{ pagination.total }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="col-xl-8 col-lg-7 col-md-7 col-sm-12 text-right">
                            <filter-keyword
                                placeholder="Search..."
                                v-model="keyword"
                            />
                            <!-- <filter-select
                                :data="dataCategory"
                                placeholder="Provider"
                            />
                            <filter-select
                                :data="dataDate"
                                placeholder="All Dates"
                            /> -->
                        </div>
                    </div>
                </div>
                <div class="page-list">
                    <div class="row row-label">
                        <div class="col-lg-2 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Name
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                images
                            </span>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Brand
                            </span>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Date
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
                            v-for="(item, index) in listProduct"
                            :key="index"
                        >
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.name }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12 img-provider">
                                <img
                                    style="    width: 150px;height: 150px;"
                                    :src="item && item.avatar?domainMedia+item.avatar:'/images/photoDefault/noImage_product.png'"
                                    alt="avatar"
                                    class="img-thumbnail"
                                >
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <h3
                                    class="item-normal"
                                    v-if="item.brand && item.brand.name "
                                >
                                    {{ item.brand.name }}
                                </h3>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <span class="txt-label">
                                    {{ item.createdAt| moment }}
                                </span>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <nuxt-link
                                    class="create-link"
                                    :to="`/product/edit/${item.id}`"
                                >
                                    <button class="item-btn btn-view">
                                        <span class="icon-article" />
                                    </button>
                                </nuxt-link>
                            
                                <button
                                    class="item-btn btn-view"
                                    @click="deleteProduct(item)"
                                >
                                    <span
                                        class="icon-delete"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="paginate">
                    <pagination
                        id="pagination"
                        :skip="pagination.skip"
                        :limit="pagination.limit"
                        :total="pagination.total" 
                        @change="changePage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FilterKeyword from"~/components/FilterKeyword";
// import FilterSelect from"~/components/FilterSelect";
import Pagination from"~/components/Pagination";
import{pagination}from'~/helpers/dataHelper';
import{mapGetters, mapActions, mapState}from"vuex";
import moment from"moment";

export default{
    components:{
        FilterKeyword,
        // FilterSelect,
        Pagination
    },
    data() {
        return{
            dataCategory:[
                {name:"All Provider", value:0},
                {name:"Provider", value:1}
            ],
            sortCategory:"",
            dataDate:[],
            keyword:"",
            flag:false,
            categories:[],
            page:1
        };
    },
    async created() {
        const _this = this;

        await this.handleGetProducts();
    },
    async mounted() {
        this.search();
    },
  
    computed:{

        ...mapGetters('products', ['listProduct',"pagination"]),
        ...mapGetters("provider", ["listProvider"]),
        ...mapState(['domainMedia']),
        ...mapState({
            pagination:(state)=>state.products.pagination
        }),
    },
    methods:{
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
        async search() {
            await this.handleGetProducts();
            this.total = this.pagination && this.pagination.total;
        },
        async handleGetProducts() {
            const _this = this;
            const obj = {
                keyword:this.keyword, 
                limit:this.pagination.limit, 
                skip:this.pagination.skip
            };
            const{results, pagination} =  await this.getProducts(obj);
            this.categories = results;
            this.total = pagination && pagination.total;
        },
        deleteProduct(item) {
            this.$confirm('This will permanently delete the product. Continue?', 'Warning', {
                confirmButtonText:'OK',
                cancelButtonText:'Cancel',
                type:'warning'
            }).then(()=>{
                this.productDeleteByID({_id:item.id});
                this.$message({
                    type:'success',
                    message:'Delete completed'
                });
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'Delete canceled'
                });          
            });
        },
        async changePage(page) {
            let data = pagination(page, this.pagination.limit);
            this.pagination.skip = data;
            await this.handleGetProducts();
        },
        
        ...mapActions('products', [
            , 'productDeleteByID','getProducts'
        ]),

    },
    filters:{
        moment(date) {
            return moment(date).format('DD-MM-YYYY');
        }
    }

};
</script>

