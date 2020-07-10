<template>
    <div class="template-blank template-login">
        <div class="form-container">
            <div class="text-center">
                <img
                    src="/images/screen_logo.svg"
                    alt="hubbco-admin"
                    class="form-logo"
                >
            </div>
            <h3 class="form-description">
                Please login to your account
            </h3>
            <div class="form-group">
                <label
                    class="form-label"
                    for="user-name"
                >
                    user name
                </label>
                <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="User name"
                    class="form-input"
                    v-model="data.email"
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
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    class="form-input"
                    v-model="data.password"
                >
                <span
                    class="form-label-error"
                    v-if="errorText"
                >
                    {{ errorText }}
                </span>
            </div>
            <button
                class="form-btn"
                @click="login"
            >
                login
            </button>
            <nuxt-link
                to="/forgot-password"
                class="link-forgot"
            >
                Fogot Password
            </nuxt-link>
            <p class="form-link">
                Don't have an account?
                <nuxt-link to="/signup">
                    Regiter now
                </nuxt-link>
            </p>
        </div>
    </div>
</template>

<script>
import{mapGetters, mapActions}from'vuex';

export default{
    layout:'blank',
    data() {
        return{
            data:{
                email:'',
                password:''
            },
            errorText:'',
            // isError: false,
        };
    },
    computed:{
        ...mapGetters('user', [
            'userAuth',
            'profile',
        ])
    },
    methods:{
        ...mapActions('user', [
            'signin',
        ]),
        async login() {
            if(!this.validateEmail())
                return;

            if(!this.data.password){
                this.errorText = 'The password is required!';
                return false;
            }
            else
                this.errorText = '';

            let data = await this.signin(this.data).catch(err=>{
                this.errorText = err.message;
                return false;
            });

            if(data)
                this.$router.push('/');
            
        },
        validateEmail() {
            if(!this.data.email) {
                this.errorText = 'The email is required!';
                return false;
            }

            this.data.email = this.data.email.toLowerCase().trim();
            var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
            if(!regExp.test(this.data.email)) {
                this.errorText = 'The email is invalid!';
                return false;
            }
            else
                return true;

        }
    }
};
</script>
