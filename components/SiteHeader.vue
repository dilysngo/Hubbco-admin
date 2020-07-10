<template>
    <div class="header">
        <div class="row no-gutters">
            <div class="col-lg-auto col-md-auto col-sm-12">
                <!-- <h1 class="logo">
                    <img
                        src="/images/logo.svg"
                        alt="protect tip"
                        class="logo-img"
                    >
                </h1> -->
            </div>
            <div class="col-lg col-md col-sm-12 text-right  ">
                <ul class="header-menu">
                    <li>
                        <a
                            href="http://protecttrip.vn/"
                            class="header-link"
                            target="_blank"
                        >
                            <span class="icon icon-worldwide" />
                            View Website
                        </a>
                    </li>
                    <li>
                        <div class="user-account">
                            <img
                                src="~/assets/images/img-avatar.png"
                                alt="avatar"
                                class="user-avatar"
                            >
                            <div class="user-info">
                                <h3 class="user-name">
                                    Huong phan
                                    <div class="dropdown dropdown-user">
                                        <button
                                            class="dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i
                                                class="fa fa-angle-down"
                                                aria-hidden="true"
                                            />
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li
                                                class="dropdown-item"
                                                @click="logout"
                                            >
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                </h3>
                                <h4 class="user-role">
                                    Hi, Admin
                                </h4>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import{mapGetters, mapActions}from'vuex';

export default{
    methods:{
        ...mapActions('user', [
            'signout'
        ]),
        logout(){
            this.signout();
            this.$router.push('/login');
        }
    }
};
</script>

