<template>
    <div
        :id="id"
        class="modal fade box-popup show"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div
                class="modal-content"
                v-if="!isSuccess"
            >
                <div
                    class="icon-close"
                    @click="close"
                >
                    <img src="/images/icon-close.svg">
                </div>
                <h2 class="modal-title">
                    Add New Provider
                </h2>
                <div class="button-upload">
                    <input
                        type="file"
                        class="btn-upload"
                        hidden
                        id="btn-upload"
                    >
                    <label
                        for="btn-upload"
                        class="btn-upload"
                    >Drag and drop logo here or <span>Browser</span></label>
                </div>
                <input
                    type="text"
                    class="form-input"
                    placeholder="Provider name"
                >
                <div class="group-button">
                    <button
                        class="btn btn-cancel"
                        @click="close"
                    >
                        Cancel
                    </button>
                    <button
                        class="btn"
                        @click="isSuccess = true"
                        disabled
                    >
                        Create now
                    </button>
                </div>
            </div>
            <div
                class="modal-content popup-success"
                v-else
            >
                <div
                    class="icon-close"
                    @click="close"
                >
                    <img src="/images/icon-close.svg">
                </div>
                <div class="img-tick">
                    <img
                        src="~/assets/images/tick.svg"
                        alt="tick"
                        class="icon-tick"
                    >
                </div>
                <p class="txt-success">
                    Success!
                </p>
                <p class="note-success">
                    Add New Provider Success
                </p>
                <button 
                    class="btn btn-done"
                    @click="close"
                >
                    Ok
                </button>
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