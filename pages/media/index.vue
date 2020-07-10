<template>
    <section class="page-container page-media">
        <div class="page-header d-flex">
            <h4>Gallery ({{ total ? total : 0 }})</h4>
            <div class="header-right d-flex">
                <div class="form-search">
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
        <div class="page-body">
            <div class="container-media">
                <div class="row">
                    <div class="col-md-3">
                        <div class="item-g add-media">
                            <input
                                type="file" 
                                id="fileGallery"
                                ref="files"
                                hidden
                                @change="changeMedia($event)"
                            >
                            <button
                                class="btn-add-media"
                                id="addMedia"
                                @click="addMedia"
                            >
                                <img src="~/assets/images/img-add.svg">
                            </button>
                            <p>Upload new file</p>
                        </div>
                    </div>
                    <div
                        class="col-md-3"
                        v-for="gItem in list"
                        :key="gItem.id"
                    >
                        <div 
                            class="item-g"
                            :id="'g' + gItem.id"
                        >
                            <div
                                class="g-thumbnail"
                                :style="{ 
                                    'background-image': 'url(' + convertToUrl(gItem.imageInfo.url) + ')',
                                    'background-size': 'cover',
                                    'background-repeat': 'no-repeat'
                                }"
                            >
                                <div 
                                    class="g-action d-flex"
                                >
                                    <a
                                        title="Preview"
                                        @click="showMedia(gItem)"
                                        class="btn-link"
                                    >
                                        <img src="~/assets/images/img-play.svg">
                                    </a>
                                    <a
                                        title="Coppy Link"
                                        @click="handlerCoppyLink(gItem)"
                                        class="btn-link"
                                    >
                                        <img
                                            class="img-coppy"
                                            src="~/assets/images/img-coppy.svg"
                                        >
                                    </a>                                      
                                    <a
                                        title="Delete"
                                        @click="deleteItem(gItem)"
                                        class="btn-link"
                                    >
                                        <img src="~/assets/images/img-trash.svg">
                                    </a>
                                </div>
                            </div>
                            <div 
                                class="g-info"
                                @click="showMedia(gItem)"
                            >
                                <h3 
                                    class="g-name"
                                    :title="gItem.name"
                                >
                                    {{ gItem.name }}
                                </h3>
                                <div class="g-detail d-flex">
                                    <div
                                        v-if="gItem.lenght"
                                        class="g-lenght"
                                    >
                                        <i class="icon-play icon-site" />
                                        <span>{{ gItem.lenght }}</span>
                                    </div>
                                    <div
                                        v-else
                                        class="g-size"
                                    >
                                        <img
                                            class="icon-img"
                                            src="~/assets/images/img-img.svg"
                                        >
                                        <span>{{ gItem.imageInfo.size | convertToSize }}</span>
                                    </div>
                                    <div
                                        class="g-created"
                                    >
                                        <img
                                            class="icon-clock" 
                                            src="~/assets/images/img-clock.svg"
                                        >
                                        <span>{{ gItem.createdAt | convertToDateString }}</span>
                                    </div>
                                </div>
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
        <div 
            id="modalVideo"   
            class="modal fade modal-media frame-image"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel" 
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <button
                        class="btn-close"
                        data-dismiss="modal"
                        data-backdrop="static"
                        data-keyboard="false"
                    >
                        <img src="~/assets/images/close.svg">
                    </button>
                    <img
                        :src="(mediaShow && mediaShow.imageInfo && convertToUrl(mediaShow.imageInfo.url))"
                        class="img-preview"
                    >
                </div>
            </div>
        </div>
        <popup-coppy
            ref="popupCoppy"
            id="popupCoppy"
        />
    </section>
</template>
<script>
import Swal from'sweetalert2';
import{mapGetters, mapActions}from'vuex';
import{convertToDateString}from'~/helpers/dateHelper';
import{convertToSize, convertToUrl, pagination}from'~/helpers/dataHelper';
import Pagination from'~/components/Pagination';
import PopupCoppy from'~/components/PopupCoppy';

export default{
    middleware:['authentication'],
    components:{
        Pagination,
        PopupCoppy
    },
    data() {
        return{
            totalPlaylists:5,
            keyword:'',
            type:'',
            skip:0,
            limit:12,
            total:0,
            isAdmin:false,
            timeOut:null,
            mediaShow:null,
            convertToUrl:convertToUrl,
            loading:false
        };
    },
    watch:{
        keyword:function(newData) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(()=>{
                this.getAllMedia();
            }, 500);
        }
    },
    computed:{
        ...mapGetters('media', ['list', 'pagination'])
    },
    created() {
        this.getAllMedia();
        this.total = this.pagination && this.pagination.total;
    },
    mounted() {
        console.log('this.pagination', this.pagination);
    },
    methods:{
        ...mapActions('media', 
            ['findMedias', 'uploadMedia', 'deleteMedia']),
            
        addMedia() {
            this.$refs.files.click();
        },

        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getAllMedia();
        },

        async getAllMedia() {
            let data = await this.findMedias({keyword:this.keyword, type:this.type, limit:this.limit, skip:this.skip}).catch(err=>{
                if(err)
                    console.log(err.message);
            });
            this.total = data.pagination && data.pagination.total;
            this.loading = false;
        },

        handlerCoppyLink(item) {
            console.log('item ==>', item);
            this.$refs.popupCoppy.open(item);
        },

        showMedia(item) {   
            this.mediaShow = item;
            console.log('this.mediaShow', this.mediaShow);
            $('#modalVideo').modal('show');
        },
        async changeMedia(event) {
            this.loading = true;
            let formData = new FormData();
            let file = event.target ? event.target.files[0] : event[0];
            formData.append('media', file);
            console.log('media ====>>');
            let uploadMedia = await this.uploadMedia(formData).catch(err=>{
                this.loading = false;
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:`${err.message}!`,
                });
                return;             
            });
            if(uploadMedia)
                this.getAllMedia();
        },

        async deleteItem(media) {
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
                    const data = await this.deleteMedia(media.id);
                    await this.getAllMedia();
                    Swal.fire(
                        'Deleted!',
                        'Your category has been deleted.',
                        'success'
                    );
                }
            });
        },

        async handlerType(item) {
            this.type = item.value;
            await this.getAllMedia();
        },
    },
    filters:{
        convertToDateString(date) {
            return convertToDateString(date);
        },
        convertToSize(size) {
            return convertToSize(size);
        }
    }
};
</script>