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
                        {{ title }}
                    </h3>
                    <div class="input-coppy">
                        <input
                            name="text"
                            type="text"
                            id="text"
                            class="form-input"
                            v-model="url"
                        >
                    </div>
                    <div>
                        <button
                            @click="success"
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
import{convertToUrl}from'~/helpers/dataHelper';

export default{
    data() {
        return{
            url:null
        };
    },
    props:{
        id:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:'Coppy link address'
        },
        buttonName2:{
            type:String,
            default:'Coppy'
        },
    },
    methods:{
        open(data) {
            $('#' + this.id).modal('show');
            this.url = convertToUrl(data.imageInfo && data.imageInfo.url);
        },
        success() {
            var coppyText = document.getElementById("text");
            coppyText.select(); 
            document.execCommand("copy");
            this.close();
            this.$notify({
                group:'foo',
                title:'Success',
                text:'Coppy value successfully!'
            });
        },
        close() {
            $('#' + this.id).modal('hide');
        }
    },
};
</script>

