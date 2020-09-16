<template>
    <section class="template-post">
        <div class="page-header">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="page-title">
                        Keywords
                    </h2>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                    <button
                        class="btn-normal"
                        @click="editKeyword()"
                    >
                        New Keywords
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
                                    All Keywords 
                                    <span class="item-value">
                                        ({{ total }})
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
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Keyword Name
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Priority
                            </span>
                        </div>
                        <div class="col-lg col-md col-sm-12">
                            <span class="txt-label">
                                Create Date
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
                            v-for="(item, index) in allKeywords"
                            :key="index"
                        >
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.name }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.priority }}
                                </h3>
                            </div>
                            <div class="col-lg col-md col-sm-12">
                                <h3 class="item-normal">
                                    {{ item.createdAt| moment }}
                                </h3>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12">
                                <button
                                    class="item-btn btn-view"
                                    @click="editKeyword(item)"
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
            <el-dialog
                :title="isUpdate ? 'Update Keyword':'Create Keyword'"
                :visible.sync="isOpenPopupEdit"
                width="400px"
                center
            >
                <el-form :model="formEdit">
                    <el-form-item
                        label="Name Keyword"
                        label-width="120px"
                    >
                        <el-input
                            placeholder="Keyword name"
                            :class="{'has-error': errors && errors.firstRule('keywordName') === 'required'}"
                            v-model="formEdit.nameKeyword"
                            id="keywordName"
                            name="keywordName"
                            v-validate="'required'"
                        />
                        <div
                            v-if="errors && errors.firstRule('keywordName') === 'required'"
                            class="text-error text-red"
                        >
                            Name keyword is not empty.
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="Priority Keyword"
                        label-width="120px"
                    >
                        <el-input-number
                            v-model="formEdit.priority"
                            :min="1"
                        />
                    </el-form-item>
                </el-form>
                <span
                    slot="footer"
                    class="dialog-footer"
                >
                    <el-button @click="isOpenPopupEdit = false">Cancel</el-button>
                    <el-button
                        type="primary"
                        @click="submitEdit"
                    >{{ isUpdate ? 'Save':'Create' }}</el-button>
                </span>
            </el-dialog>
        </div>
    </section>
</template>

<script>
import Swal from'sweetalert2';
import FilterKeyword from"~/components/FilterKeyword";
import Pagination from"~/components/Pagination";
import{pagination}from'~/helpers/dataHelper';
import{mapGetters, mapActions}from"vuex";
import moment from"moment";

export default{
    middleware:['authentication'],
    data() {
        return{
            keyword:"",
            page:1,
            limit:10,
            skip:0,
            total:0,
            timeOut:null,
            loading:false,
            isOpenPopupEdit:false,
            formEdit:{
                id:null,
                nameKeyword:"Keyword Name",
                priority:1
            },
            isUpdate:false
        };
    },
    components:{
        Pagination,
        FilterKeyword
    },
    computed:{
        ...mapGetters('keywords', ['allKeywords','keywordsPagination'])
    },
    watch:{
        keyword:function(newData) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(()=>{
                this.getKeywords();
            }, 500);
        }
    },
    async created() {
        await this.getKeywords();
    },
    methods:{
        ...mapActions('keywords', ['getAllKeywords','deleteKeyword','updateKeyword','createKeyword']),
        async getKeywords() {
            await this.getAllKeywords({keyword:this.keyword, limit:this.limit, skip:this.skip}).catch(err=>{
                console.log(err);
            });
            this.total = this.keywordsPagination && this.keywordsPagination.total;
        },
        async onDelete(key){
            this.$confirm('Are you sure delete this keyword ?', 'Warning', {
                confirmButtonText:'OK',
                cancelButtonText:'Cancel',
                type:'warning'
            }).then(()=>{
                this.removeKeyword(key.id);
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'Delete canceled'
                }); 
            });
        },
        async removeKeyword(keyId) {
            const result = await this.deleteKeyword({id:keyId});
            if(result) {
                this.$message({
                    type:'success',
                    message:'Delete keyword completed'
                });
            }
        },
        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getKeywords();
        },
        editKeyword(key = null) {
            if(!key) {
                this.isUpdate = false;
                this.formEdit.id = null;
                this.formEdit.nameKeyword = 'Keyword Name';
                this.formEdit.priority = 1;
            }
            else{
                this.isUpdate = true;
                this.formEdit.id = key.id;
                this.formEdit.nameKeyword = key.name;
                this.formEdit.priority = key.priority;
            }
            this.isOpenPopupEdit = true;
        },
        async submitEdit() {
            const validate = await this.$validator.validateAll();
            if(!validate) {
                this.$nextTick(()=>{
                    this.$el.querySelector('.has-error').scrollIntoView(false);
                });
                return;
            }
            if(this.isUpdate) {
                const result = await this.updateKeyword({id:this.formEdit.id, data:{name:this.formEdit.nameKeyword, priority:this.formEdit.priority}}).catch(err=>{
                    console.log(err);
                });
                if(result) {
                    this.isOpenPopupEdit = false;
                    this.$notify({
                        title:'Update Keyword success',
                        type:'success'
                    });
                    this.getKeywords();
                }
            }
            else{
                const result = await this.createKeyword({name:this.formEdit.nameKeyword, priority:this.formEdit.priority}).catch(err=>{
                    console.log(err);
                });
                if(result) {
                    this.isOpenPopupEdit = false;
                    this.$notify({
                        title:'Create Keyword success',
                        type:'success'
                    });
                    this.getKeywords();
                }
            }
        }
    },
    filters:{
        moment(date) {
            return moment(date).format('DD-MM-YYYY');
        }
    }
};
</script>

