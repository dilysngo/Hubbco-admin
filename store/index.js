import Vuex from'vuex';
import user from'./modules/user';
import media from'./modules/media';
import category from'./modules/category';
import blog from'./modules/blog';
import provider from'./modules/provider';
import brands from'./modules/brands';
import productsModule from'./modules/products';
import suppliersModule from'./modules/suppliers';
import keywords from'./modules/keywords';
import{getCookie}from'../helpers/dataHelper';

export default function() {
    return new Vuex.Store({
        state:{
            domainMedia:process.env.DOMAIN_MEDIA_URL,
        },
        mutations:{},
        actions:{
            nuxtServerInit({state}, {req}) {
                state.user.userAuth = null;
                if(req.headers.cookie) {
                    let userAuth = getCookie('userAuth', req.headers.cookie);
                    if(userAuth) {
                        userAuth = JSON.parse(userAuth);
                        if(userAuth && userAuth.accessToken && userAuth.tokenExpire && new Date(userAuth.tokenExpire) >= new Date())
                            state.user.userAuth = userAuth;
                    }
                }
            }
        },
        modules:{
            media,
            user,
            category,
            blog,
            provider,
            brands,
            products:productsModule,
            suppliers:suppliersModule,
            keywords
        }
    });
};
