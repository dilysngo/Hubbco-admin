<template>
    <div>
        <div>
            <ul class="el-upload-list el-upload-list--picture-card">
                <li
                    v-for="(image,index) in current"
                    :key="index"
                    tabindex="0"
                    class="el-upload-list__item is-success"
                >
                    <img
                        v-if="image && image.type==='Image'"
                        :src="domainMedia + image.imageInfo.url"
                        alt=""
                        class="el-upload-list__item-thumbnail"
                    ><a class="el-upload-list__item-name"><i class="el-icon-document" />zzxzx.jpeg
                    </a>
                    <label class="el-upload-list__item-status-label">
                        <i class="el-icon-upload-success el-icon-check" />
                    </label><i class="el-icon-close" />
                    <i class="el-icon-close-tip">press delete to remove</i><!----><span class="el-upload-list__item-actions">
                        
                        <!-- <span
                            class="el-upload-list__item-preview"
                            @click="dialogVisible = true"
                        ><i class="el-icon-zoom-in" /></span>
                         -->
                        <!-- <span
                            class="el-upload-list__item-delete"
                            @click="deleteFileUpload(index)"
                        ><i class="el-icon-delete" /></span></span> -->

                        <!-- <el-dialog :visible.sync="dialogVisible">
                            <img
                                width="100%"
                                :src="domainMedia + image.imageInfo.url"
                                alt=""
                            >
                        </el-dialog> -->
                    </span>
                </li>

                <li
                    v-for="(image,index) in listImage"
                    :key="index"
                    tabindex="0"
                    class="el-upload-list__item is-success"
                >
                    <img
                        :src="image"
                        alt=""
                        class="el-upload-list__item-thumbnail"
                    ><a class="el-upload-list__item-name"><i class="el-icon-document" />zzxzx.jpeg
                    </a>
                    <label class="el-upload-list__item-status-label">
                        <i class="el-icon-upload-success el-icon-check" />
                    </label><i class="el-icon-close" />
                    <i class="el-icon-close-tip">press delete to remove</i><!----><span class="el-upload-list__item-actions">
                        
                        <!-- <span
                            class="el-upload-list__item-preview"
                            @click="dialogVisible = true"
                        ><i class="el-icon-zoom-in" /></span> -->
                        
                        <span
                            class="el-upload-list__item-delete"
                            @click="deleteFileUpload(index)"
                        ><i class="el-icon-delete" /></span></span>
                    <!-- 
                    <el-dialog :visible.sync="dialogVisible">
                        <img
                            width="100%"
                            :src="image"
                            alt=""
                        >
                    </el-dialog> -->
                </li>
            </ul><div
                tabindex="0"
                class="el-upload el-upload--picture-card"
                @click="openFileUpload"
            >
                <i class="el-icon-plus" />
            </div>

            <input
                @change="previewFiles"
                type="file"
                accept="image/*"
                multiple
                id="fileLoader"
                name="files"
                style="display:none"
            > 
        </div>
    </div>
</template>
<script>
import _ from'lodash';
import{mapState}from'vuex';
export default{
    props:{
        current:{
            type:Array,
            default:()=>[],
            filesUpload:null
        },
    },
    data() {
        return{
            dialogImageUrl:'',
            dialogVisible:false,
            fileUpload:[],
            validImageTypes:["image/gif", "image/jpeg", "image/png"],
            listImage:[]
        };
    },
    computed:{
        ...mapState({
            domainMedia:state=>state.domainMedia,
        }),

    },
    methods:{
        deleteFileUpload(position) {
            var _this = this;
            _this.listImage.splice(position, 1);
            _this.fileUpload.splice(position, 1);
            // _this.previewFiles();
        },
        openFileUpload() {
            $("#fileLoader").click();
        },
        
        previewFiles(event) {
            var _this = this;
            if(event) {
                if(_this.checkSizeUpload(event.target.files)){
                    _.forEach(event.target.files, o=>{
                        if(o.type && _.indexOf(_this.validImageTypes, o.type) > -1) {
                            _this.fileUpload.push(o);
                            var reader = new FileReader();
                            reader.onload = function() {
                                _this.listImage.push(reader.result);
                            };
                            reader.readAsDataURL(o);
                            console.log(_this.fileUpload);
                            console.log(_this.listImage);
                        }
                    });
                }
                else{
                    console.log('falise');
                    // new PNotify({
                    //     title:'',
                    //     text:_this.$t('maxSize',['15MB']),
                    //     addclass:'bg-danger'
                    // });
                }
            }
            _this.renderFileImage();
        },
        renderFileImage() {
            const _this = this;
            _this.$emit('imageUpload', _this.fileUpload);
        },
        checkSizeUpload(file){
            var _this  = this;
            var canUpload = true;
            var sizeMax = 1024 * 1024 * 15; // 15MB
            var totalSize = 0;
            var fileUpload = _.cloneDeep(_this.fileUpload);
            _.forEach(_.filter(file,(v)=>{
                return _.indexOf(_this.validImageTypes, v.type) > -1;
            }),(o)=>{
                fileUpload.push(o);
            });
            _.forEach(fileUpload,(o)=>{
                var size = o.size;
                totalSize = totalSize + size;
                if(totalSize > sizeMax) {
                    canUpload = false;return false;
                }
            });
            return canUpload;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
};
</script>