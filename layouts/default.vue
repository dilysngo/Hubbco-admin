<template>
    <div class="theme-default">
        <div class="main-content">
            <no-ssr>
                <notifications group="foo" />
            </no-ssr>
            <div class="col-left">
                <menu-page />
            </div>
            <div class="col-right">
                <site-header />
                <div class="container-main">
                    <nuxt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SiteHeader from'~/components/SiteHeader';
import MenuPage from'~/components/MenuPage';

export default{
    components:{
        SiteHeader,
        MenuPage
    }
};
</script>

