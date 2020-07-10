<template>
    <div class="template-blank template-signup">
        <div class="form-container">
            <div class="text-center">
                <img
                    src="/images/logo-form.svg"
                    alt="protect-trip"
                    class="form-logo"
                >
            </div>
            <h3 class="form-description">
                Create your account
            </h3>
            <div class="form-group">
                <label
                    class="form-label"
                    for="user-name"
                >
                    user name
                </label>
                <input 
                    name="user-name" 
                    type="text"
                    id="user-name"
                    placeholder="Enter user name"
                    class="form-input"
                >
            </div>
            <div class="form-group">
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
                    placeholder="Enter email"
                    class="form-input"
                >
            </div>
            <div class="form-group">
                <label
                    class="form-label"
                    for="user-password"
                >
                    Password
                </label>
                <input 
                    name="user-password" 
                    type="password" 
                    id="user-password"
                    placeholder="Enter password"
                    class="form-input"
                >
            </div>
            <div class="form-group">
                <label
                    class="form-label"
                    for="user-cfpassword"
                >
                    Confirm Password
                </label>
                <input 
                    name="user-cfpassword" 
                    type="password" 
                    id="user-cfpassword"
                    placeholder="Confirm password"
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
                Login
            </button>
            <p class="form-link">
                Already have an account?
                <nuxt-link to="/login">
                    Login now
                </nuxt-link>
            </p>
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
