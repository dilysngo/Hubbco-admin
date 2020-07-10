<template>
    <div
        :id="id"
        class="modal fade box-popup popup-view show"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div
                    class="icon-close"
                    @click="close"
                >
                    <img src="/images/icon-close.svg">
                </div>
                <img
                    src="~/assets/images/img-gallery.png"
                    class="img-gallery"
                >
                <div class="group-button">
                    <button
                        class="btn btn-cancel"
                        @click="close"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data:function(){
        return{
            isSuccess:false
        };
    },
    props:{
        id:{
            type:String,
            default:''
        },
        isEdit:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        open() {
            $('#' + this.id).modal({
                backdrop:'static',
                keyboard:false,
                show:true,
            });
        },
        close() {
            $('#' + this.id).modal('hide');
            this.isSuccess = false;
        }
    }
};
</script>