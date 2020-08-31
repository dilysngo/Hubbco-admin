require('dotenv').config();
const webpack = require('webpack');

module.exports = {
    env:process.env,
    /*
    ** Headers of the page
    */
    head:{
        title:process.env.PROJECT_NAME,
        meta:[
            {charset:'utf-8'},
            {name:'viewport', content:'width=device-width, initial-scale=1'},
            {hid:'description', name:'description', content:process.env.PROJECT_NAME}
        ],
        link:[
            {rel:'icon', type:'image/x-icon', href:'/favicon.svg'}
        ],
        script:[
            // {src: '//cdn.ckeditor.com/4.6.2/full/ckeditor.js'}
            {src:'/js/ckeditor/ckeditor.js'} /* eslint-disable */
        ],
    },
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        'font-awesome/css/font-awesome.min.css',
        '~/assets/scss/main.scss',
        'element-ui/lib/theme-chalk/index.css',
        'element-ui/lib/theme-chalk/reset.css',
    ],
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},
    modules: [
        '@nuxtjs/axios'
    ],
    plugins: [
        {src: '~/plugins/bootstrap'},
        {src: '~/plugins/axios'},
        {src: '~/plugins/authentication'},
        {src: '~/plugins/event-bus', ssr: false},
        {src: '~/plugins/vue-notification', ssr: false},
        {src: '~/plugins/vue-chartjs', ssr: false},
        {src: '~/plugins/vue-ckeditor2', ssr: false},
        {src: '~/plugins/vue-ckeditor5', ssr: false},
        {src: '~/plugins/element-ui', ssr: true}

    ],
    /*
    ** Build configuration
    */
    build: {
        vendor: [
            'jquery',
            'bootstrap',
            'vue-chartjs',
            'vue-notification',
            'vue-ckeditor2',
            'vue-ckeditor5',
            'element-ui'

        ],
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ],
        /*
        ** Run ESLint on save
        */
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    }
};
