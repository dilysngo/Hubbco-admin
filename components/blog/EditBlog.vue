<template>
    <div
        :id="id"
        class="modal fade"
        role="dialog"
    >
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div
                    class="modal-header"
                >
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                    >
                        &times;
                    </button>
                </div>
                <!-- <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label
                                for="recipient-name"
                                class="title-table"
                                style="display: block"
                            >Category name:</label>
                            <input
                                v-model="categoryUpdate.nameVi"
                                class="cate-input"
                                style="border:1px solid;"
                                type="text"
                            >
                        </div>
                    </form>
                </div> -->
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        class="btn btn-default"
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import{mapActions, mapGetters}from'vuex';
import Swal from'sweetalert2';
export default{
    data() {
        return{
            data:null,
            blogUpdate:{
                id:'',
                author:'',
                content:'',
                slug:'',
                title:'',
                category:''
            },
            isError:null,
        };
    },
    created() {
        this.reset();
    },
    computed:{
        
    },
    props:{
        id:{
            type:String,
            default:''
        },
    },
    methods:{
        reset() {
         
        },
        // open(data) {
        //     console.log(data);
        //     $('#' + this.id).modal({
        //         backdrop: 'static',
        //         keyboard: false,
        //         show: true,
        //     });
        //     this.reset();
        //     if (data && data.id) {
        //         this.blogUpdate.id = data.blog.id;
        //         this.blogUpdate.author = data.blog.id;
        //         this.blogUpdate.content = data.blog.id;
        //         this.blogUpdate.slug = data.blog.id;
        //         this.blogUpdate.title = data.blog.id;
        //         this.blogUpdate.category = data.category.name;
        //     }
            
        // },
        close() {
            $('#' + this.id).modal('hide');
        },
        // async onUpdateCategory(){
        //     let result = await this.updateCategory(this.categoryUpdate);
        //     if (result){
        //         await this.findCategories();
        //         Swal.fire({
        //             type: 'success',
        //             title: 'Success',
        //             text: 'Successfully updated category',
        //         });
        //         this.$emit('success', {data: {categoryID: this.categoryUpdate.id}, isNew: true});
        //         this.close();
        //     }
        // },
        // ...mapActions('category',['findCategories','updateCategory','getCategoryParent']),
    }
};
</script>
