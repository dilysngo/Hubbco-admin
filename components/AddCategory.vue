<template>
    <div
        class="modal fade box-popup"
        :id="id"
        role="dialog"
        data-backdrop="static" 
        data-keyboard="false"
        @click.self="close"
    >
        <div class="modal-dialog modal-dialog-centered text-center">
            <div 
                class="modal-content"
                @click="''"
            >
                <div class="modal-body">
                    <h3 class="box-title modal-title m-b-30">
                        {{ flag ? 'Update Category' : title }}
                    </h3>
                    <div class="input-coppy">
                        <input
                            name="text"
                            type="text"
                            id="text"
                            class="form-input"
                            placeholder="Enter Category Name"
                            v-model="name"
                        >
                    </div>
                    <div class="text-error-cate">
                        <p>{{ textErr }}</p>
                    </div>
                    <div
                        v-if="flag"
                    >
                        <button
                            @click="handleUpdate"
                            class="btn-coppy"
                        >
                            Save
                        </button>
                    </div>
                    <div v-else>
                        <button
                            @click="handleSubmit"
                            class="btn-coppy"
                        >
                            {{ buttonName2 }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>
<script>
import{convertStringToSlug}from'~/helpers/dataHelper';
import{mapGetters, mapActions}from"vuex";
export default{
    data() {
        return{
            flag:false,
            name:null,
            cateID:null,
            textErr:null
        };
    },
    props:{
        id:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:'Add New Category'
        },
        buttonName2:{
            type:String,
            default:'Save'
        },
    },
    methods:{
        ...mapActions("category", ["createCategory", "updateCategory"]),
        open() {
            this.flag = false;
            $('#' + this.id).modal('show');
        },

        update(obj) {
            this.flag = true;
            this.name = obj.name;
            this.cateID = obj.id;
            $('#' + this.id).modal('show');
        },

        async handleUpdate() {
            if(!this.validateName())
                return;
            const obj = {
                id:this.cateID,
                name:this.name,
                slug:convertStringToSlug(this.name)
            };
            const category = await this.updateCategory(obj).catch(err=>{
                if(err)
                    this.textErr = err && err.message;
            });
            if(category) {
                this.close();
                this.$emit('update');
                this.$notify({
                    group:'foo',    
                    title:'Success',
                    text:'Updated successfully!'
                });
            }            
        },

        async handleSubmit() {
            if(!this.validateName())
                return;
            const obj = {
                name:this.name,
                slug:convertStringToSlug(this.name)
            };
            const category = await this.createCategory(obj).catch(err=>{
                if(err)
                    this.textErr = err && err.message;
            });
            if(category) {
                this.close();
                this.$emit('create');
                this.$notify({
                    group:'foo',
                    title:'Success',
                    text:'Created successfully!'
                });
            }
        },

        validateName() {
            if(!this.name) {
                this.textErr = 'The category name is required!';
                return false;
            } 
            else{
                this.textErr = '';
                return true;
            }
        },

        close() {
            this.textErr = null;
            this.name = null;
            $('#' + this.id).modal('hide');
        }
    },
};
</script>
<style>
.text-error-cate {
    text-align: center;
    margin-top: 6px;
    color: red;
    font-family: Gilroy-Regular;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 0px !important;
}
</style>