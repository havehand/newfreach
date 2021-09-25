import Vue from "vue"
import Vuex from "vuex"
import {setCookie, getUserInfo, removeUserCookie} from "@/utils/userCookie"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: getUserInfo(),
        menuRoutes: [],
        current: '1'
    },
    mutations:{
        setUserInfo(state, userInfo){
            state.user = userInfo;
        },
        logout(state){
            state.user = {
                username: '',
                appkey: '',
                email: '',
                role: ''
            }
        },
        changeMenuRoutes(state, routes){
            state.menuRoutes = routes;
        },
        changeMenuCurrent(state, key){
            state.current = key;
        }
    },
    actions:{
        async setUserInfo(ctx, userInfo) {
            ctx.commit('setUserInfo', userInfo);
            setCookie(userInfo);
        },
        async logout(ctx){
            ctx.commit('logout');
            removeUserCookie();
        }
    }
})