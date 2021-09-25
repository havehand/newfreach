import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/layout/Home";
import Login from "@/views/layout/Login";
import store from "@/store"
// import getMenuRoute from "@/utils/permission";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/index',
        meta:{
            title: '首页',
            hidden: false,
            icon: 'home'
        },
        children:[{
            path: 'index',
            name: 'Index',
            component: ()=>import('@/views/page/index'),
            meta: {
                title: '统计',
                hidden: false,
                icon: 'appstore'
            }
        }]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录',
            hidden: true,
            icon: "paper-clip"
        }
    },
    {
        path: '/product',
        name: 'Product',
        meta: {
            title: "商品",
            hidden: false,
            icon: "snippets"
        },
        component: Home,
        children:[
            {
                path: 'list',
                name: 'ProductList',
                meta: {
                    title: '商品列表',
                    hidden: false,
                    icon: "unordered-list"
                },
                component: ()=>import('../views/page/productList')
            },
            {
                path: 'add',
                name: 'ProductAdd',
                meta: {
                    title: '添加商品',
                    hidden: false,
                    icon: "plus-circle"
                },
                component: ()=>import('../views/page/productAdd')
            },
            {
                path: 'category',
                name: 'Category',
                meta: {
                    title: '商品分类',
                    hidden: false,
                    icon: "menu"
                },
                component: ()=>import('@/views/page/category')
            },
            {
                path: 'edit/:id',
                name: 'ProductEdit',
                meta: {
                    title: '商品编辑',
                    hidden: true,
                    icon: "menu"
                },
                component: ()=>import('@/views/page/productAdd')
            }
        ]
    },
]
const router = new VueRouter({
    // mode:"history",
    routes: routes
});

// let isAddRoute = false
router.beforeEach(function (to, from, next){
    if (to.path !== '/login'){
        setTimeout(()=>{
            if (store.state.user.appkey && store.state.user.username && store.state.user.role){
                // if (!isAddRoute) {
                //     const arr = getMenuRoute(store.state.user.role, asyncRouterMap);
                //     store.commit('changeMenuRoutes', routes.concat(arr));
                //     console.log(routes.concat(arr));
                //     router.addRoutes(arr);
                //     isAddRoute = true;
                // }
                // console.log(to.path);
                store.commit('changeMenuRoutes', routes);
                return next();
            }else {
                return next('/login')
            }
        },0)
    }else {
        return next();
    }
})
export default router