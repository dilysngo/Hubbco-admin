<template>
    <div class="template-blank">
        <div class="form-container">
            <div class="text-center">
                <img
                    src="/images/logo-form.svg"
                    alt="protect-trip"
                    class="form-logo"
                >
            </div>
            <h3 class="form-description">
                Vui lòng nhập địa chỉ email để reset lại mật khẩu
            </h3><div class="form-group">
                <label
                    class="form-label"
                    for="user-email"
                >
                    email
                </label>
                <input 
                    name="user-email" 
                    type="text"
                    id="user-email"
                    placeholder="Nhập email"
                    class="form-input"
                >
            </div>
            <span
                class="form-label-error"
                v-if="errorText"
            >
                {{ errorText }}
            </span>
            <button
                class="form-btn"
            >
                lấy lại mật khẩu
            </button>
        </div>
    </div>
</template>

<script>

export default{
    layout:'blank',
    data() {
        return{
            errorText:''
        };
    },
};
</script>
