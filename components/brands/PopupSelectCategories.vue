<template>
    <div
        :id="id"
        class="modal fade popup-allCategories"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
    >
        <div
            class="modal-dialog modal-dialog-centered"
            role="document"
        >
            <div class="modal-content">
                <div class="modal-body">
                    <h4>{{ title }}</h4>
                    <p>{{ textDescriptions }}</p>
                    <p
                        v-if="isErrorMaxRange"
                        class="text-error text-red"
                    >
                        Maximum of this categories is {{ maxSelect || 2 }}.
                    </p>
                    <a
                        class="position-absolute"
                        style="cursor: pointer;"
                        @click="close"
                    >
                        CLOSE
                    </a>
                    <div class="content">
                        <ul class="list-category d-flex flex-wrap">
                            <li
                                v-for="item in allCategories"
                                :key="item.id"
                                :class="
                                    listIdParent &&
                                        listIdParent.indexOf(item.id) !== -1
                                        ? 'active'
                                        : ''
                                "
                                @click="chooseItem(item, 'parent')"
                            >
                                {{ item.name }}
                                <i
                                    v-if="listIdParent &&
                                        listIdParent.indexOf(item.id) !== -1"
                                    class="el-tag__close el-icon-close"
                                    @click.stop="removeParent(item)"
                                />
                            </li>
                        </ul>
                        <p v-if="childsCategories.length > 0">
                            Sub categories of <b>{{ currentParentSelect }}</b>
                        </p>
                        <ul class="list-category d-flex flex-wrap">
                            <li
                                v-for="child in childsCategories"
                                :key="child.id"
                                :class="
                                    listIdChild &&
                                        listIdChild.indexOf(child.id) !== -1
                                        ? 'active'
                                        : ''
                                "
                                @click="chooseItem(child, 'child')"
                            >
                                {{ child.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <a
                        @click="save"
                        style="cursor: pointer;"
                    >
                        Save Selection
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import{mapActions}from'vuex';
export default{
    props:{
        id:{
            type:String,
            default:'',
        },
        title:{
            type:String,
            default:'CATEGORIES:',
        },
        textDescriptions:{
            type:String,
            default:'Please choose the categories that interest you and your business below:',
        },
        listCategoriesSelected:{
            type:Array,
            default:()=>{
                return[];
            },
        },
        maxSelect:{
            type:Number,
            default:2,
        },
    },
    data() {
        return{
            allCategories:[],
            childsCategories:[],
            categoryProducts:this.listCategoriesSelected || [],
            listParentSelected:[],
            listIdParent:[],
            listChildSelected:[],
            listIdChild:[],
            currentParentSelect:'',
            isErrorMaxRange:false
        };
    },
    mounted() {},
    methods:{
        ...mapActions('category', ['getAllCategory']),

        initData() {
            this.childsCategories = [];
            this.listParentSelected = [];
            this.listIdParent = [];
            this.listChildSelected = [];
            this.listIdChild = [];
            this.currentParentSelect = '';
            this.isErrorMaxRange = false;
        },
        async open(listCategories) {
            if(!this.listCategoriesSelected || this.listCategoriesSelected.length === 0)
                this.categoryProducts = listCategories;
            this.initData();
            this.getAllCategoryR();
            $('#' + this.id).modal('show');
        },
        chooseItem(item, mode) {
            if(mode === 'parent') {
                if(this.listIdParent.indexOf(item.id) !== -1) {
                    this.childsCategories = item.children;
                    this.currentParentSelect = item.name;
                    this.isErrorMaxRange = false;
                    return;
                }
                if(this.listParentSelected.length >= this.maxSelect) {
                    this.isErrorMaxRange = true;
                    return;
                }

                this.listParentSelected.push(item);
                this.listIdParent.push(item.id);
                if(item.children.length > 0) {
                    this.listChildSelected.push(item.children[0]);
                    this.listIdChild.push(item.children[0].id);
                }
                else{
                    this.listChildSelected.push(null);
                    this.listIdChild.push(null);
                }
                this.childsCategories = item.children;
                this.currentParentSelect = item.name;
            }
            else{
                this.isErrorMaxRange = false;
                if(this.listIdChild.indexOf(item.id) === -1) {
                    const index1 = this.listChildSelected.findIndex((element, index, array)=>{
                        return Number(element.parentId) === Number(item.parentId);
                    });
                    this.listIdChild[index1] = item.id;
                    this.listChildSelected[index1] = JSON.parse(JSON.stringify(item));
                    this.$forceUpdate();
                }
            }
        },
        removeParent(item) {
            const index = this.listIdParent.indexOf(item.id);
            this.listIdParent.splice(index, 1);
            this.listParentSelected.splice(index, 1);
            this.listIdChild.splice(index, 1);
            this.listChildSelected.splice(index, 1);
            this.isErrorMaxRange = false;
        },
        close() {
            $('#' + this.id).modal('hide');
        },
        save() {
            if(this.listParentSelected.length > 0) {
                const list = [];
                for(const i in this.listParentSelected) {
                    if(this.listParentSelected[i].children.length > 0) {
                        list.push(this.listParentSelected[i]);
                        list.push(this.listChildSelected[i]);
                    }
                    else
                        list.push(this.listParentSelected[i]);
                }
                this.$emit('save', list);
                this.close();
            }
            else{
                this.$notify({
                    title:'Please choose category!',
                    type:'Error',
                });
            }
        },
        async getAllCategoryR() {
            this.allCategories = await this.getAllCategory({
                skip:0,
                limit:140,
            }).catch((err)=>{
                console.log(err);
            });
            if(this.categoryProducts.length > 0) {
                let j = 0;
                for(const i in this.categoryProducts) {
                    if(!this.categoryProducts[i].parentId) {
                        this.listParentSelected[j] = this.allCategories.find(
                            (el)=>el.id === this.categoryProducts[i].id
                        );
                        this.listIdParent[j] = this.listParentSelected[j].id;
                        if(this.categoryProducts[Number(i) + 1] && this.categoryProducts[Number(i) + 1].parentId) {
                            this.listChildSelected[j] = this.listParentSelected[j].children.find((el)=>el.id === this.categoryProducts[Number(i) + 1].id);
                            this.listIdChild[j] = this.listChildSelected[j].id;
                        }
                        else{
                            this.listChildSelected[j] = null;
                            this.listIdChild[j] = null;
                        }
                        j = j + 1;
                    }
                    else
                        continue;
                }
                this.chooseItem(this.listParentSelected[0], 'parent');
            }
        },
    },
};
</script>

<style></style>
