<template>
    <div class="coverImage">
        <ul class="el-upload-list el-upload-list--picture-card">
            <li
                v-for="(item, index) in currentlistFormat"
                :key="index"
                tabindex="0"
                class="el-upload-list__item is-success"
            >
                <template v-if="item.flag === 0">
                    <img
                        v-if="item.isImage"
                        :src="convertUrlMedia(item.data.imageInfo.url)"
                        alt="cover image"
                        class="el-upload-list__item-thumbnail"
                    >
                    <video
                        v-else
                        :src="convertUrlMedia(item.data.imageInfo.url)"
                        alt="cover video"
                        class="el-upload-list__item-thumbnail"
                    />
                </template>
                <template v-else>
                    <img
                        v-if="item.data.startsWith('data:image')"
                        :src="item.data"
                        alt="cover image"
                        class="el-upload-list__item-thumbnail"
                    >
                    <video
                        v-if="item.data.startsWith('data:video')"
                        :src="item.data"
                        alt="cover video"
                        class="el-upload-list__item-thumbnail"
                    />
                </template>
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="item.dialogVisible = true"
                    ><i class="el-icon-zoom-in" /></span>
                    <span
                        class="el-upload-list__item-delete"
                    ><i class="el-icon-delete" /></span></span>

                <el-dialog
                    :visible.sync="item.dialogVisible"
                    :title="item.data.name"
                    :key="item.data.id"
                >
                    <template v-if="item.flag === 0">
                        <img
                            v-if="item.isImage"
                            :src="convertUrlMedia(item.data.imageInfo.url)"
                            alt="cover image"
                            width="100%"
                        >
                        <video
                            v-else
                            :src="convertUrlMedia(item.data.imageInfo.url)"
                            alt="cover video"
                            controls
                            width="100%"
                        />
                    </template>
                    <template v-else>
                        <img
                            v-if="item.data.startsWith('data:image')"
                            :src="item.data"
                            alt="cover image"
                            width="100%"
                        >
                        <video
                            v-if="item.data.startsWith('data:video')"
                            :src="item.data"
                            alt="cover video"
                            controls
                            width="100%"
                        />
                    </template>
                </el-dialog>
            </li>
        </ul>
        <div
            tabindex="0"
            class="el-upload el-upload--picture-card"
            @click="addMedia"
        >
            <i class="el-icon-plus" />
        </div>
        <input
            id="fileGallery"
            ref="files"
            type="file"
            accept="image/png,image/gif,image/jpeg,video/*"
            hidden
            @change="changeMedia($event)"
        >
    </div>
</template>
<script>
import _ from'lodash';
import{convertToUrl, checkImageByUrl}from'~/helpers/dataHelper';

export default{
    props:{
        currentListUrl:{
            type:Array,
            default:()=>[],
        },
    },
    data() {
        return{
            fileUpload:[],
            validTypes:['image/gif', 'image/jpeg', 'image/png', 'image/svg', 'video/*'],
            isRenderCarousel:false,
            currentlistFormat:[],
            dialogVisible:false,
            currentMediaSelect:''
        };
    },
    mounted() {
        this.isRenderCarousel = true;
        for(const item of this.currentListUrl)
            this.currentlistFormat.push({flag:0, data:item, isImage:this.checkImage(item.imageInfo.url), dialogVisible:false});
    },
    methods:{
        addMedia() {
            this.$refs.files.click();
        },
        renderFileImage() {
            const _this = this;
            _this.$emit('mediaUpload', _this.fileUpload);
        },
        async changeMedia(event) {
            this.isRenderCarousel = false;
            const _this = this;
            const input = event.target;

            if(input.files && input.files[0]) {
                if(
                    input.files[0].type &&
                    (_.indexOf(_this.validTypes, input.files[0].type) > -1 || input.files[0].type.startsWith('video/'))
                ) {
                    if(_this.checkSizeUpload(input.files)) {
                        const reader = new FileReader();
                        _this.fileUpload.push(input.files[0]);
                        reader.onload = (e)=>{
                            this.currentlistFormat.unshift({flag:1, data:e.target.result, dialogVisible:false});
                            this.isRenderCarousel = true;
                        };
                        reader.readAsDataURL(input.files[0]);
                        document.getElementById('fileGallery').value = '';
                    }
                    else{
                        this.isRenderCarousel = true;
                        this.$notify.error({
                            title:'Error',
                            message:'Multimedia size is too large.',
                        });
                    }
                }
                else{
                    this.isRenderCarousel = true;
                    this.$notify.error({
                        title:'Error',
                        message:'Multimedia type is not support.',
                    });
                }
            }
            _this.renderFileImage();
        },
        checkSizeUpload(file) {
            const _this = this;
            let canUpload = true;
            const sizeMax = 1024 * 1024 * 3; // 2MB
            let totalSize = 0;
            const fileUpload = _.cloneDeep(_this.fileUpload);
            _.forEach(
                _.filter(file, (v)=>{
                    return _.indexOf(_this.validTypes, v.type) > -1;
                }),
                (o)=>{
                    fileUpload.push(o);
                }
            );
            _.forEach(fileUpload, (o)=>{
                const size = o.size;
                totalSize = totalSize + size;
                if(totalSize > sizeMax) {
                    canUpload = false;
                    return false;
                }
            });
            return canUpload;
        },
        checkImage(url) {
            return checkImageByUrl(url);
        },
        convertUrlMedia(url) {
            return convertToUrl(url);
        },
    },
};
</script>
