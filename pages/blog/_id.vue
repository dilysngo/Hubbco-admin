<template>
    <div class="create-aticle">
        <div class="page-header">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 
                        class="page-title" 
                        v-if="post"
                    >
                        Edit Post
                    </h2>
                    <h2 
                        class="page-title" 
                        v-else
                    >
                        Add New Post
                    </h2>
                    <div 
                        class="alert alert-danger"
                        v-if="errorText"
                    >
                        {{ errorText }}
                    </div>
                    <div 
                        class="alert alert-success"
                        v-if="successText"
                    >
                        {{ successText }}
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                    <button 
                        class="btn-normal"
                        v-if="post" 
                        @click="upateBlogWithCate"
                    >
                        Edit Post
                    </button>
                    <button 
                        class="btn-normal" 
                        v-else
                        @click="createBlogWithCate"
                    >
                        Save Post
                    </button>
                    <!-- <nuxt-link
                        to="/"
                        class="btn-normal btn-white"
                    >
                        Preview
                    </nuxt-link> -->
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="page-container">
                <div class="col-layout">
                    <div class="layout-title">
                        <input
                            v-model="title"
                            type="text"
                            name="title"
                            class="ip-title"
                            placeholder="Enter Title Here"
                        >
                    </div>
                    <div class="layout-editor">
                        <no-ssr>
                            <vue-ckeditor
                                v-model="content"
                                :config="config"
                                @blur="onBlur($event)" 
                                @focus="onFocus($event)"
                                @contentDom="onContentDom($event)"
                                @dialogDefinition="onDialogDefinition($event)"
                                @fileUploadRequest="onFileUploadRequest($event)"
                                @fileUploadResponse="onFileUploadResponse($event)"
                            />
                        </no-ssr>
                    </div>
                </div>
                <div class="col-sidebar">
                    <div class="sidebar-collapse">
                        <div class="collapse-item">
                            <button
                                class="collapse-btn"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseStatus"
                                aria-expanded="false"
                                aria-controls="collapseStatus"
                            >
                                Publish
                                <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                />
                            </button>
                            <div
                                class="collapse"
                                id="collapseStatus"
                            >
                                <div class="collapse-content ">
                                    <ul class="list-publish">
                                        <li class="publish-item">
                                            Status: <span
                                                v-if="status === 'draft'"
                                                class="publish-content"
                                            >Draft</span>
                                            <span
                                                v-else
                                                class="publish-content"
                                            >Public</span>
                                            <span class="icon-edit" />
                                        </li>
                                    </ul>
                                    <button
                                        @click="changeStatus"
                                        class="btn-publish"
                                    >
                                        <span v-if="status ==='draft'">Public Now</span>
                                        <span v-else>Draft Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="collapse-item">
                            <button
                                class="collapse-btn"
                                type="button"
                                @click="handlerOpenModal"
                            >
                                Image Gallery
                            </button>
                        </div>               
                        <div class="collapse-item">
                            <button
                                class="collapse-btn"
                                type="button"
                            >
                                Categories
                                <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                />
                            </button>
                            <div
                                class="collapse show"
                                id="collapseCate"
                            >
                                <div class="collapse-content">
                                    <ul class="list-category">
                                        <li class="category-item">
                                            <label
                                                :for="'radio' + index"
                                                class="category-label"
                                                v-for="(item, index) in listCate"
                                                :key="index"                                               
                                            >
                                                {{ item.name }}
                                                <input
                                                    v-model="radioCate"
                                                    type="radio"
                                                    name="radio"
                                                    :id="'radio' + index"
                                                    :value="item.id"
                                                >
                                                <span class="radio-mask" />
                                            </label>
                                        </li>
                                        <!-- <li class="category-item">
                                            <nuxt-link
                                                to="/"
                                                class="item-link"
                                            >
                                                Add New Categories
                                            </nuxt-link>
                                        </li> -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="collapse-item">
                            <button
                                class="collapse-btn"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseImage"
                                aria-expanded="true"
                                aria-controls="collapseImage"
                            >
                                Featured Image
                                <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                />
                            </button>
                            <div
                                class="collapse show"
                                id="collapseImage"
                            >
                                <div
                                    v-if="url"
                                    class="collapse-content"
                                >
                                    <img
                                        width="100%"
                                        height="100%"
                                        :src="url"
                                    >
                                </div>
                                <div class="collapse-content">
                                    <div class="change">
                                        <button class="btn">
                                            Set Featured Image
                                        </button>
                                        <input 
                                            type="file" 
                                            name="myfile" 
                                            @change="previewImage" 
                                            accept="image/*" 
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-html="content" />
        <gallery
            @galleryImage="handleGallery"
            ref="gallery" 
            id="gallery"
        />
        <popup-coppy
            ref="popupCoppy"
            id="popupCoppy"
        />        
    </div>
</template>
<script>
import Vue from'vue';
import{mapGetters, mapActions}from'vuex';
import{convertStringToSlug}from'~/helpers/dateHelper';
import{convertToUrl, urlLocal}from'~/helpers/dataHelper';
import Gallery from'~/components/Gallery';
import{url}from'~/helpers/dataHelper';
import VueCkeditor from'vue-ckeditor2';
import PopupCoppy from'~/components/PopupCoppy';

Vue.component('gallery', Gallery);

export default{
    middleware:['authentication'],
    components:{
        VueCkeditor,
        PopupCoppy
    },
    data() {
        return{
            status:'draft',
            id:null,
            file:null,
            url:null,
            flag:false,
            title:'',
            radioCate:'',
            content:'',
            errorText:'',
            successText:'',
            post:null,
            config:{
                toolbar:[
                    {name:'font', items:['FontSize', 'TextColor', 'Bold', 'Italic', 'Underline']},
                    {name:'format', items:['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Link', 'Unlink', 'CopyFormatting', 'RemoveFormat']},
                    {name:'insert',items:['Image']}
                ],
                height:350,
                language:'en',
                fontSize_sizes:'8/0.61538em;10/0.76923em;12/0.92307em;14/1.07692em;16/1.23076em;18/1.38461em;20/1.53846em;22/1.6923em;24/1.84615em;26/2em;28/2.15384em;30/2.30769em;32/2.46153em;34/2.61538em;36/2.76923em;38/2.92307em;40/3.07692em;42/3.23076em;44/3.38461em;46/3.53846em;48/3.6923em;50/3.84615em;52/4em;54/4.15384em;56/4.30769em;58/4.46153em;60/4.61538em;62/4.76923em;64/4.92307em;66/5.07692em;68/5.23076em;70/5.38461em;72/5.53846em',
            },
            blog:{
                title:null,
                categoryId:null,
                content:null,
                author:null,
                description:null,
                slug:null,
                status:null,
            }
        };
    },
    computed:{
        ...mapGetters('user', ['userAuth']),
        ...mapGetters('category', ['listCate']),
        contentCode() {
            return hljs.highlightAuto(this.content).value;
        }
    },
    
    async created() {
        if(this.$route.params.id !== 'create-article') {
            this.post = await this.getBlogs(this.$route.params.id);
            this.title = this.post.title;
            this.radioCate = this.post.category.id;
            this.content = this.post.content;
            this.url = this.post.images ? this.convertUrlImage(this.post.images[0]) : null;
            this.status = this.post.status;
        }
        await this.findCategories();
        this.dataCategory = this.listCate;

    },
    methods:{
        onBlur(evt) {
            console.log(evt);
        },
        onFocus(evt) {
            console.log(evt);
        },
        onContentDom(evt) {
            console.log(evt);
        },
        onDialogDefinition(evt) {
            console.log(evt);
        },
        onFileUploadRequest(evt) {
            console.log(evt);
        },
        onFileUploadResponse(evt) {
            console.log(evt);
        },

        changeStatus(){
            this.status = (this.status === 'draft') ? 'public' : 'draft';
            console.log(this.status); 
        },

        previewImage(event) {
            this.file = event.target.files[0];
            if(this.file)this.url = URL.createObjectURL(this.file);
        },

        async createBlogWithCate() {
            if(!this.validateTitle())
                return;
            if(!this.validateContent())
                return;
            if(!this.validateRadioCate())
                return;
            if(!this.validateFile())
                return;

            this.blog.author = this.userAuth.profile.firstName;
            this.blog.status = this.status;

            let blog = await this.createBlog(this.blog).catch(err=>{
                if(err){
                    this.errorText = err.message;
                }
            });
            if(blog) {
                if(! await this.handlerUploadImage(blog.id))
                    return;

                this.errorText = '';   
                this.title = '';
                this.radioCate = '';
                this.content = '';
                this.successText = 'Add new post is success!';
                this.clearSuccessText();
            }
        },

        handlerOpenModal() {
            this.$refs.gallery.open();
        },

        handleGallery(item) {
            const myVar = setInterval(()=>{
                this.$refs.popupCoppy.open(item);
                clearInterval(myVar);
            }, 200);
            
        },

        async upateBlogWithCate() {
            if(!this.validateTitle())
                return;
            if(!this.validateContent())
                return;
            if(!this.validateRadioCate())
                return;
            if(!this.url && !this.validateFile())
                return;

            this.blog.id = this.$route.params.id;
            this.blog.author = this.userAuth.profile.firstName;
            this.blog.status = this.status;

            let blog = await this.updateBlog(this.blog).catch(err=>{
                if(err){
                    this.errorText = err.message;
                }
            });
            if(blog) {
                if(this.file && ! await this.handlerUploadImage(this.blog.id))
                    return;

                this.successText = 'Update post is success!';
                this.clearSuccessText();
            }            
        },

        validateTitle() {
            if(!this.title) {
                this.errorText = 'Blog title is required!';
                return false;
            }
            else{
                this.blog.title = this.title;
                this.blog.description = this.title;
                this.blog.slug = convertStringToSlug(this.title);
                return true;
            }
        },

        validateContent() {
            if(!this.content) {
                this.errorText = 'Blog content is required!';
                return false;
            }
            else{
                this.blog.content = this.content;
                return true;
            }
        },

        validateRadioCate() {
            if(!this.radioCate) {
                this.errorText = 'Blog category is required!';
                return false;
            }
            else{
                this.blog.categoryId = this.radioCate;
                return true;
            }
        },

        validateFile() {
            if(!this.file) {
                this.errorText = 'Featured Image is required!';
                return false;
            }
            else
                return true;

        },

        async handlerUploadImage(id) {
            let formData = new FormData();
            formData.append('image-product', this.file);
            let result = await this.uploadImges({id:id, file:formData}).catch(err=>{
                this.errorText = err.message;
            });
            if(!result)
                return false;
            else
                return true;
        },

        convertUrlImage(url) {
            return convertToUrl(url);
        },
        
        clearSuccessText() {
            const myVar = setInterval(()=>{
                this.successText = '';
                clearInterval(myVar);
            }, 3000);
        },

        ...mapActions('category',['findCategories']),
        ...mapActions('blog',['getBlogs','updateBlog','uploadImges','createBlog'])
    },
};
</script>

