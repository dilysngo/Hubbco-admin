<template>
    <div class="template-post">
        <div class="page-header">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="page-title">
                        Provider
                    </h2>
                </div>
                <!-- <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                    <button
                        class="btn-normal"
                        type="button"
                        @click="createProvider"
                    >
                        New Provider
                    </button>
                </div> -->
            </div>
        </div>
        <div class="page-body">
            <div class="page-container">
                <div class="page-filter">
                    <div class="row align-items-center">
                        <div class="col-xl-4 col-lg-5 col-md-5 col-sm-12">
                            <ul class="filter-sub">
                                <li class="item">
                                    All Providers 
                                    <span class="item-value">
                                        {{ total }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="col-xl-8 col-lg-7 col-md-7 col-sm-12 text-right">
                            <filter-keyword
                                placeholder="Search..."
                                v-model="keyword"
                            />
                            <filter-select
                                :data="dataDate"
                                placeholder="All Dates"
                            />
                        </div> -->
                    </div>
                </div>
                <div class="page-list">
                    <div class="row row-label">
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <span class="txt-label">
                                Provider
                            </span>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            <span class="txt-label">
                                Description
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                quality
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Actions
                            </span>
                        </div>
                    </div>
                    <div
                        class="row row-item"
                        v-for="(item, index) in listProvider"
                        :key="index"
                    >
                        <div class="col-lg-3 col-md-6 col-sm-12 img-provider">
                            <h3 class="item-normal">
                                <img
                                    class="logoSup"
                                    :src="item.logos"
                                >
                            </h3>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            <h3 class="item-normal">
                                {{ item.description }}
                            </h3>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <div class="supplier-quality">
                                <div
                                    style="position: absolute;"
                                >
                                    <span class="item-star">
                                        <span
                                            class="icon-star icon-star-full"
                                            v-for="i in Math.floor(item.stars)"
                                            :key="`full-${i}`"
                                        />
                                        <span class="icon-star icon-star-half" />
                                        <span
                                            class="icon-star icon-star"
                                            v-for="i in (5 - Math.round(item.stars))"
                                            :key="`null-${i}`"
                                        />
                                    </span>
                                    <p style="color: #2b8def">
                                        {{ item.review || 0 }} Reviews
                                    </p>
                                </div>
                                <div style="margin-left: 58%;">
                                    <p
                                        class="rating"
                                        style="margin-bottom: 6px;"
                                    >
                                        {{ item.rating || 0 }}%
                                    </p>
                                    <p
                                        style="\padding: -10px;font-size: 11px;"
                                    >
                                        recommend
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg col-md col-sm-12">
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
        <create-provider
            :id="'popup-provider'"
            ref="createProvider"
            :is-edit="isEdit"
        />
    </div>
</template>

<script>
// import FilterKeyword from "~/components/FilterKeyword";
// import FilterSelect from "~/components/FilterSelect";
import Pagination from"~/components/Pagination";
import CreateProvider from"~/components/provider/CreateProvider";
import{mapGetters, mapActions}from"vuex";
import moment from"moment";
import{convertToDateString}from'~/helpers/dateHelper';

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
            isEdit:false,
            
        };
    },
    components:{
        // FilterKeyword,
        // FilterSelect,
        Pagination,
        CreateProvider
    },
    async mounted() {
        let result = await this.findProvider();
        this.total = result.pagination.total;
    },
    computed:{
        ...mapGetters("provider", ["listProvider"])
    },
    methods:{
        async changePage(page) {},
        createProvider() {
            this.isEdit = false;
            this.$refs.createProvider.open();
        },
        ...mapActions("provider",["findProvider"])
    },
    filters:{
        convertToDateString
    }
};
</script>

