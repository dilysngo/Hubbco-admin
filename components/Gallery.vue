<template>
    <div 
        :id="id"
        class="modal fade modal-gallery"
        tabindex="-1"
        role="dialog"
        :aria-labelledby="id"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <button
                    @click="close()"
                    class="btn-close border-black"
                >
                    <img src="~/assets/images/close.svg">
                </button>
                <div class="pd-20">
                    <h1 
                        class="title-component"
                    >
                        Image Gallery
                    </h1>
                    <input
                        class="form-input"
                        placeholder="Search..."
                        v-model="condition.keyword"
                    >
                </div>
                <div class="frame-gallery">
                    <ul class="list-gallery">
                        <li
                            v-for="(item, index) in list"
                            :key="index"
                            class="gallery-item"
                        >
                            <input
                                type="radio"
                                :id="'gallery'+ index"
                                name="gallery"
                                class="ip-gallery"
                            >
                            <label
                                class="label-gallery"
                                :for="'gallery'+ index"
                            >
                                <img
                                    class="gallery-img"
                                    :src="convertToUrl(item.imageInfo.url)"
                                    @click="getMediaClicked(item)"
                                >
                                <h3 class="name-item">{{ item.name }}</h3>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import{mapActions, mapGetters}from'vuex';
import{convertToUrl}from'~/helpers/dataHelper';

export default{
    data() {
        return{
            condition:{
                type:null,
                keyword:null,
            },
            timeOut:null,
            skip:0,
            limit:11,
            total:0,
            Medias:[],
            urlImage:'',
            mediaId:'',
            poster:'',
            convertToUrl:convertToUrl,
            mediaSelected:null
        };
    },
    props:{
        id:{
            type:String,
            default:''
        },
    },
    watch:{
        'condition.keyword'(value) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(()=>this.search(), 500);
        },
    },
    computed:{
        ...mapGetters('media', ['list', 'pagination'])
    },

    methods:{
        ...mapActions('media', [
            'findMedias'
        ]),
        open() {
            this.search();
            $('#' + this.id).modal({
                show:true
            });
        },
        close() {
            $('#' + this.id).modal('hide');
        },
        search() {
            this.getMedias();
        },
        async getMedias() {
            let options = {
                keyword:this.condition.keyword, 
                type:this.condition.type || this.mediaType, 
                limit:this.limit, 
                skip:this.skip
            };
            let data = await this.findMedias(options).catch(err=>{
                if(err)
                    console.log(err.message);
            });
            this.total = data && data.pagination && data.pagination.total;
        },

        async getMediaClicked(item) {
            this.mediaSelected = item;
            this.$emit('galleryImage', this.mediaSelected);
            this.close();
        },
    }
};
</script>
