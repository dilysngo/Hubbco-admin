<template>
    <div class="filter-box filter-keyword">
        <div class="dropdown normal">
            <div class="dropdown-toggle">
                <label
                    class="filter-title"
                >
                    {{ label }}
                </label>
                <input
                    type="text"
                    class="ip-search filter-value form-controlc"
                    :placeholder="placeholder"
                    v-model="keyword"
                    @input="input(keyword)"
                >
                <a class="icon-btn">
                    <i
                        class="fa fa-search"
                        aria-hidden="true"
                    />
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data() {
        return{
            keyword:this.value
        };
    },
    props:{
        label:{
            type:String,
            default:''
        },
        placeholder:{
            type:String,
            default:'Search'
        },
        value:{
            type:String,
            default:''
        },
    },
    // watch: {
    //     keyword: function(data) {
    //         this.$emit('input', data);
    //     }
    // },
    methods:{
        input(keyword) {
            this.$emit('input', keyword);
        }
    }
};
</script>

