<template>
    <div class="menu-page">
        <h1 class="logo">
            <img
                src="/images/screen_logo.svg"
                alt="hubbco admin"
                class="logo-img"
            >
        </h1>
        <ul class="menu-list">
            <li
                class="menu-item"
                v-for="(item, index) in list"
                :key="index"
            >
                <nuxt-link
                    :to="item.link"
                    class="menu-link"
                    :class="{'active' : $route.path === item.link}"
                >
                    <span :class="'menu-icon ' + item.icon" />
                    {{ item.name }}
                </nuxt-link>
            </li>
            <!-- <li class="menu-item">
                <nuxt-link
                    to="/"
                    class="menu-link"
                >
                    <span class="menu-icon menu-icon-logout fa fa-arrow-circle-o-left" />
                    Hide Menu
                </nuxt-link>
            </li> -->
        </ul>
        <!-- <div class="logout">
            <nuxt-link
                to="/"
                class="menu-link"
            >
                <span class="menu-icon fa fa-sign-out" />
                Logout
            </nuxt-link>
        </div> -->
    </div>
</template>

<script>
export default{
    data() {
        return{
            list:[
                {name:'Dashboard', link:'/', icon:'icon-dashboard'},
                {name:'Post', link:'/blog', icon:'icon-article'},
                // {name: 'Product', link: '/product', icon: 'icon-product'},
                // {name: 'Provider', link: '/provider', icon: 'icon-product'},
                {name:'Media', link:'/media', icon:'icon-media'},
                // {name: 'Menu', link: '/menu', icon: 'icon-menus'},
                // {name: 'Form', link: '/form', icon: 'icon-form'},
                // {name: 'Settings', link: '/setting', icon: 'icon-settings'},
            ]
        };
    },
};
</script>

