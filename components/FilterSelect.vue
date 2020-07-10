<template>
    <div
        class="filter-box"
        :class="transparent ? 'transparent' : ''"
    >
        <div class="dropdown normal">
            <div
                class="dropdown-toggle" 
                data-toggle="dropdown"
            >
                <label class="filter-title">
                    {{ label }}
                </label>
                <span
                    v-if="!isKeyword"
                    class="filter-value form-control"
                >
                    {{ selected ? selected.name : placeholder }}
                </span>
                <input
                    v-else
                    type="text"
                    class="ip-search filter-value form-control"
                    :placeholder="placeholder" 
                    v-model="keyword"
                    @input="search()"
                >
                <a class="icon-btn">
                    <i
                        class="fa fa-sort-desc"
                        aria-hidden="true"
                    />
                </a>
            </div>
            <i
                class="fa fa-times"
                aria-hidden="true"
                @click="clearKeyword()"
                v-if="isKeyword"
            />
            <ul class="dropdown-menu">
                <li
                    class="dropdown-menu-item"
                    v-for="(item, index) in list"
                    :key="index"
                >
                    <a
                        class="dropdown-link"
                        @click="changeItem(item)"
                    >
                        <span class="dropdown-link-title">
                            {{ item.name }}
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import{mapActions}from'vuex';

export default{
    data() {
        return{
            list:this.data,
            selected:null,
            keyword:'',
            isReset:false
        };
    },
    props:{
        label:{
            type:String,
            default:''
        },
        transparent:{
            type:Boolean,
            default:false
        },
        isKeyword:{
            type:Boolean,
            default:false
        },
        placeholder:{
            type:String,
            default:''
        },
        data:{
            type:Array,
            default:()=>[]
        },
        type:{
            type:String,
            default:''
        },
        select:{
            type:Number,
            default:0
        },
    },
    async created() {
        // await this.getlookup();
        this.reset();
        this.search();
        if(this.select > 0)
            this.selected = this.list.find(item=>item.value === this.select);
    },
    mounted() {
    },
    methods:{
        ...mapActions('category', [
            'findlookupCategories'
        ]),
        ...mapActions('brand', [
            'findBrands'
        ]),
        reset() {
            this.isReset = true;
            this.selected = '';
            this.keyword = '';
        },
        clearKeyword(){
            this.reset();
            this.$emit('input', this.selected, this.reset);
        },
        changeItem(item) {
            this.$emit('input', item);
            this.selected = item;
            this.keyword = this.selected.name;
        },
        search() {
            if(this.type === 'category') {
                clearTimeout(this.timeOut);
                this.timeOut = setTimeout(()=>this.loadCategory(), 300);
            }
            if(this.type === 'brand') {
                clearTimeout(this.timeOut);
                this.timeOut = setTimeout(()=>this.loadBrand(), 300);
            }
        },
        async loadCategory() {
            let data = await this.findlookupCategories({keyword:this.keyword || ''}).catch(err=>{
                if(err)
                    console.log(err);
            });
            this.list = data.results;
        },
        async loadBrand() {
            let data = await this.findBrands({keyword:this.keyword || ''}).catch(err=>{
                if(err)
                    console.log(err);
            });
            this.list = data && data.results;
        },
        // async getlookup() {
        //     let data = [{
        //         name: 'Ranking',
        //         value: 'Arts & Crafts'
        //     }, {
        //         name: 'Created Date',
        //         value: 'Mens Fashion'
        //     }];
        //     this.list = data || [];
        // }
    }
};
</script>

