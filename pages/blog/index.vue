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
                        to="/blog/create-article"
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
                    <div class="row align-items-center">
                        <div class="col-xl-4 col-lg-5 col-md-5 col-sm-12">
                            <ul class="filter-sub">
                                <li class="item">
                                    All Posts
                                    <span class="item-value">
                                        ({{ total }})
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="col-xl-8 col-md-5 col-md-5 col-sm-12">
                            <div class="search-blog">
                                <input
                                    type="text"
                                    placeholder="Search for..."
                                    class="search-input"
                                    name="search"
                                    v-model="keyword"
                                >
                                <i class="icon-search icon-site" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-list">
                    <div class="row row-label">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            <span class="txt-label">
                                Post Title
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Author
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Categories
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Date
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
                            v-for="(item, index) in listBlog"
                            :key="index"
                        >
                            <div class="col-lg-4 col-md-4 col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.title }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.author }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.category && item.category.name }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.createdAt| moment }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.status }}
                                </h3>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <button
                                    class="item-btn btn-view"
                                    @click="editBlog(item)"
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
            keyword:"",
            dataCategory:[],
            blog:[],
            sortCategory:"",
            dataDate:[],
            page:1,
            limit:10,
            skip:0,
            total:0
        };
    },
    components:{
        Pagination,
    },
    watch:{
        keyword:function(newData) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(()=>{
                this.getAllBlog();
            }, 500);
        }
    },

    computed:{
        ...mapGetters('blog', ['listBlog','paginationBlog']),
        ...mapGetters('category', ['listCate'])
    },

    async created() {
        await this.getAllBlog();
        await this.findCategories();
        this.dataCategory = this.listCate;
        this.total = this.paginationBlog && this.paginationBlog.total;
    },
    methods:{
        onDelete(blog){
            Swal.fire({
                title:'Are you sure?',
                text:"You won't be able to revert this!",
                type:'warning',
                showCancelButton:true,
                confirmButtonColor:'#3085d6',
                cancelButtonColor:'#d33',
                confirmButtonText:'Yes, delete it!'
            }).then(async (result)=>{
                if(result.value) {
                    const data = await this.deleteBlog(blog.id);
                    await this.getAllBlog();
                    Swal.fire(
                        'Deleted!',
                        'Your blog has been deleted.',
                        'success'
                    );
                }
            });
        },

        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getAllBlog();
        },

        async getAllBlog() {
            await this.findBlogs({keyword:this.keyword, limit:this.limit, skip:this.skip}).catch(err=>{
                if(err)
                    console.log(err.message);
            });
        },

        editBlog(data) {
            this.$router.push(`/blog/${data.id}`);
        },

        async handleSuccess({data,isNew}){
            if(isNew){
                await this.findCategories();
                await this.countSubCategoryById();
                if(data.categoryID){
                    await this.getSubCategory(data.categoryID);
                }
            }
        },
        ...mapActions('category',['findCategories']),
        ...mapActions('blog',['findBlogs', 'getBlogs','deleteBlog'])

    },
    filters:{
        moment(date) {
            return moment(date).format('DD-MM-YYYY');
        }
    }
};
</script>

