<template>
    <div class="menu-page">
        <h1 class="logo">
            <img
                src="favicon.svg"
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
        </ul>
    </div>
</template>

<script>
export default{
    data() {
        return{
            list:[
                {name:'Dashboard', link:'/', icon:'icon-dashboard'},
                {name:'Post', link:'/blog', icon:'icon-article'},
                {name:'Products', link:'/product', icon:'icon-article'},
                {name:'Blog Categories', link:'/category', icon:'icon-product'},
                {name:'Media', link:'/media', icon:'icon-media'},
                // {name: 'Menu', link: '/menu', icon: 'icon-menus'},
                // {name: 'Form', link: '/form', icon: 'icon-form'},
                // {name: 'Settings', link: '/setting', icon: 'icon-settings'},
            ]
        };
    },
};
</script>

