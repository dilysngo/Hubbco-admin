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
                                    <span class="item-value">
                                        {{ total }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="col-xl-8 col-lg-7 col-md-7 col-sm-12 text-right">
                            <filter-keyword
                                placeholder="Search..."
                                v-model="keyword"
                            />
                            <filter-select
                                :data="dataCategory"
                                placeholder="Provider"
                            />
                            <filter-select
                                :data="dataDate"
                                placeholder="All Dates"
                            />
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
                        <!-- 
                       
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Promotion
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Status
                            </span>
                        </div> -->
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
                                    Date
                                </span>
                            </div>
                            <!-- <div class="col-lg-2 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Package type
                            </span>
                        </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.type }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12 img-promotion">
                                <h3 class="item-normal">
                                    <img src="~/assets/images/promotion.svg">
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    Published
                                </h3>
                            </div> -->
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <!-- <a
                                    href="/"
                                    class="item-btn btn-view"
                                >
                                    <span class="icon-view" />
                                </a> -->
                                <button class="item-btn btn-view">
                                    <span class="icon-article" />
                                </button>
                                <button class="item-btn btn-view">
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
    </div>
</template>

<script>
import FilterKeyword from"~/components/FilterKeyword";
import FilterSelect from"~/components/FilterSelect";
import Pagination from"~/components/Pagination";
import{pagination}from'~/helpers/dataHelper';
import{mapGetters, mapActions, mapState}from"vuex";
import moment from"moment";

export default{
    components:{
        FilterKeyword,
        FilterSelect,
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
            page:1,
            limit:10,
            skip:0,
            total:0,
        };
    },
    async created() {
        const _this = this;

        await this.getProducts();
    },
    async mounted() {
        // await this.findProduct();
        // console.log('listProduct',this.listProduct);
    },
  
    computed:{

        ...mapGetters('products', ['listProduct']),
        ...mapGetters("provider", ["listProvider"]),
        ...mapState(['domainMedia']),
        ...mapState({
            pagination:(state)=>state.products.pagination
        }),
        // ...mapGetters("product", ["listProduct","pagination"]),
    },
    methods:{
        async changePage(page) {
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getProduct();
        },
        handleUpdateSuccess() {
            this.getProduct();
        },
        async getProduct() {
            const obj = {
                keyword:this.keyword, 
                limit:this.limit, 
                skip:this.skip
            };
            const{results, pagination} = await this.getProducts(obj);
            this.categories = results;
            this.total = pagination && pagination.total;
        },
        ...mapActions("provider", ["findProviders"]),
        ...mapActions("product", ["findProduct"]),
        ...mapActions("products",["getProducts"])

    },

};
</script>

