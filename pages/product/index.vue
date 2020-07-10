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
                        to="/product/create-product"
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
                                Package name
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Provider
                            </span>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Categories
                            </span>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Package type
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Promotion
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Status
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
                                <h3 class="item-normal">
                                    <img src="~/assets/images/provider.png">
                                </h3>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.category }}
                                </h3>
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
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <a
                                    href="/"
                                    class="item-btn btn-view"
                                >
                                    <span class="icon-view" />
                                </a>
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
                        :page="page"
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
import{mapGetters, mapActions}from"vuex";
import moment from"moment";

export default{
    data() {
        return{
            keyword:"",
            dataCategory:[
                {name:"All Provider", value:0},
                {name:"Provider", value:1}
            ],
            sortCategory:"",
            dataDate:[],
            page:0,
            limit:10,
            skip:0,
            total:0,
        };
    },
    async mounted() {
        await this.findProduct();
        console.log('listProduct',this.listProduct);
    },
    components:{
        FilterKeyword,
        FilterSelect,
        Pagination
    },
    computed:{
        ...mapGetters("provider", ["listProvider"]),
        ...mapGetters("product", ["listProduct","pagination"]),
    },
    methods:{
        async changePage(page) {
            this.page = page;
            let params =
            {
                area:this.area,
                startDate:this.startDate,
                endDate:this.endDate,
                ages:this.ages,
                isPromotion:this.isPromotion,
                listProvider:String(this.listProvider),
                sortBy:this.sortBy,
                medicalCost:this.medicalCost,
                personalCost:this.personalCost,
                visitingCost:this.visitingCost,
                medicalTransport:this.medicalTransport,
                skip:this.page - 1
            };
            let data = await this.findProduct(params);
            if(data && data.pagination.total){
                this.listPackagePrice.forEach(item=>{
                    $(`#${item.rowId}`).removeClass('selected');
                });
                this.listCompare.forEach(item=>{
                    $(`#${item.rowId}`).addClass('selected');
                });
                this.preventCheck();
            }
        },
        ...mapActions("provider", ["findProviders"]),
        ...mapActions("product", ["findProduct"]),
    },
    created() {
       
    }
};
</script>

