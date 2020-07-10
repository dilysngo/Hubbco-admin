<template>
    <div class="template-post template-gallery">
        <div class="page-header">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="page-title">
                        Gallery
                    </h2>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                    <button
                        class="btn-normal"
                        type="button"
                        @click="createGallery"
                    >
                        Add New
                    </button>
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
                                    All files 
                                    <span class="item-value">
                                        (800)
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
                                placeholder="Images"
                            />
                            <filter-select
                                :data="dataDate"
                                placeholder="All Dates"
                            />
                        </div>
                    </div>
                </div>
                <div class="page-list">
                    <div
                        class="row"
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <div class="col-2 col col-custom">
                            <div class="img-gallery">
                                <img src="/images/arrow.svg">
                            </div>
                        </div>
                        <div class="col-2 col col-custom">
                            <div class="img-gallery">
                                <img src="~/assets/images/img-gallery.png">
                                <div class="group-icon">
                                    <button
                                        class="icon-item"
                                        type="button"
                                        @click="viewGallery"
                                    >
                                        <span class="icon icon-view" />
                                    </button>
                                    <button class="icon-item">
                                        <span class="icon icon-delete" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 col col-custom">
                            <div class="img-gallery">
                                <img src="~/assets/images/img-gallery.png">
                                <div class="group-icon">
                                    <button
                                        class="icon-item"
                                        type="button"
                                        @click="viewGallery"
                                    >
                                        <span class="icon icon-view" />
                                    </button>
                                    <button class="icon-item">
                                        <span class="icon icon-delete" />
                                    </button>
                                </div>
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
        <create-gallery 
            :id="'create-gallery'"
            ref="createGallery"
            :is-edit="isEdit"
        />
        <view-gallery
            :id="'view-gallery'"
            ref="viewGallery"
            :is-edit="isEdit"
        />
    </div>
</template>

<script>
import FilterKeyword from"~/components/FilterKeyword";
import FilterSelect from"~/components/FilterSelect";
import Pagination from"~/components/Pagination";
import CreateGallery from"~/components/gallery/CreateGallery";
import ViewGallery from"~/components/gallery/ViewGallery";
import{mapGetters, mapActions}from"vuex";
import moment from"moment";

export default{
    data() {
        return{
            keyword:"",
            dataCategory:[
                {name:"Images", value:0},
                {name:"Images", value:1}
            ],
            sortCategory:"",
            dataDate:[],
            page:0,
            limit:10,
            skip:0,
            total:0,
            isEdit:false,
            list:[
                {image_gallery:'~/assets/images/img-gallery.png'}
            ]
        };
    },
    components:{
        FilterKeyword,
        FilterSelect,
        Pagination,
        CreateGallery,
        ViewGallery
    },
    methods:{
        async changePage(page) {},
        createGallery() {
            this.isEdit = false;
            this.$refs.createGallery.open();
        },
        viewGallery() {
            this.isEdit = false;
            this.$refs.viewGallery.open();
        }
    }
};
</script>

