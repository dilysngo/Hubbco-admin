<template>
    <div class="template-post template-product">
        <div class="page-header">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="page-title">
                        Blog Categories
                    </h2>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                    <button
                        class="btn-normal"
                        @click="openModalNewCategory()"
                    >
                        New Category
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
                                    All Categories  
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
                        </div>
                    </div>
                </div>
                <div class="page-list">
                    <div class="row row-label">
                        <div class="col-lg-4 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Slug
                            </span>
                        </div>
                        <div class="col-lg-4 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Name
                            </span>
                        </div>
                        <div class="col-lg-4 col-md-2 col-sm-12">
                            <span class="txt-label">
                                Actions
                            </span>
                        </div>
                    </div>
                    <div class="list-item">
                        <div
                            class="row row-item"
                            v-for="(item, index) in categories"
                            :key="index"
                        >
                            <div class="col-lg-4 col-md-2 col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.slug }}
                                </h3>
                            </div>
                            <div class="col-lg-4 col-md-2 col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.name }}
                                </h3>
                            </div>
                            <div class="col-lg-4 col-md-2 col-sm-12">
                                <button 
                                    class="item-btn btn-view"
                                    @click="openModalUpdateCategory(item)"
                                >
                                    <span class="icon-article" />
                                </button>
                                <button
                                    @click="handleDelete(item)"
                                    class="item-btn btn-view"
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
                <add-category
                    @create="getCategories"
                    @update="handleUpdateSuccess"
                    ref="addCategory"
                    id="addCategory"
                />
            </div>
        </div>
    </div>
</template>

<script>
import swal from'sweetalert2';
import FilterKeyword from"~/components/FilterKeyword";
import Pagination from"~/components/Pagination";
import{pagination}from'~/helpers/dataHelper';
import AddCategory from'~/components/AddCategory';
import{mapGetters, mapActions}from"vuex";
import moment from"moment";

export default{
    components:{
        FilterKeyword,
        Pagination,
        AddCategory
    },
    data() {
        return{
            keyword:"",
            flag:false,
            categories:[],
            page:1,
            limit:10,
            skip:0,
            total:0,
        };
    },
    watch:{
        keyword:function(newData) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(()=>{
                this.getCategories();
            }, 500);
        }
    },
    async created() {
        await this.getCategories();
    },

    methods:{
        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getCategories();
        },

        handleUpdateSuccess() {
            this.getCategories();
        },

        openModalNewCategory() {
            this.$refs.addCategory.open();
        },
        
        openModalUpdateCategory(item) {
            this.$refs.addCategory.update(item);
        },

        async handleDelete(item) {
            const obj = {
                title:'Are you sure?',
                text:"You won't be able to revert this!",
                type:'warning',
                showCancelButton:true,
                confirmButtonColor:'#3085d6',
                cancelButtonColor:'#d33',
                confirmButtonText:'Yes, delete it!'
            };
            const{value} = await swal.fire(obj);
            if(value) {
                const data = await this.deleteCategory(item.id);
                if(data) {
                    swal.fire(
                        'Deleted!',
                        'Deleted successfully!',
                        'success'
                    );
                    this.getCategories();
                }
            }

        },

        async getCategories() {
            const obj = {
                keyword:this.keyword, 
                limit:this.limit, 
                skip:this.skip
            };
            const{results, pagination} = await this.findCategories(obj);
            this.categories = results;
            this.total = pagination && pagination.total;
        },
        ...mapActions("category", ["findCategories", "deleteCategory"]),
    },
};
</script>
