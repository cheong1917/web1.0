import {createRouter, createWebHistory} from "vue-router"
import Home from "../views/Home.vue";
import admin from "@/layouts/admin.vue"

// const routes = [
//     {
//         path: '/',
//         component: admin,
//         //子路由
//         children: [
//             {
//                 path: '/',
//                 name: 'home',
//                 component: Home,
//                 meta: {
//                     title: "首页"
//                 }
//             },
//             {
//                 path: '/goods/list',
//                 name: 'GoodList',
//                 component: ()=>import('@/views/goods/list.vue'),
//                 meta: {
//                     title: "商品管理"
//                 }
//             },
//             {
//                 path: '/category/list',
//                 name:'CategoryList',
//                 component:()=>import('@/views/category/list.vue'),
//                 meta:{
//                      title:"分类列表"
//                 }
//             }
//         ]
//     },
//     {
//         path: '/about',
//         name: 'about',
//         component: () => import('../views/About.vue'),
//         meta: {
//             title: "关于我们"
//         }
//     },
//     {
//         path: '/login',
//         name: 'login',
//         component: () => import('@/views/login.vue'),
//         meta: {
//             title: "登录页"
//         }
//     }
// ];


const routes = [
    {
        path: '/',
        name: "admin",
        component: admin,
        //子路由
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: "登录页"
        }
    }
];
//动态路由，匹配菜单
const asyncRouter = [
    {
        path: '/',
        name: '/',
        component: Home,
        meta: {
            title: "首页"
        }
    },
    {
        path: '/goods/list',
        name: '/goods/list',
        component: () => import('@/views/goods/list.vue'),
        meta: {
            title: "商品管理"
        }
    },
    {
        path: '/category/list',
        name: '/category/list',
        component: () => import('@/views/category/list.vue'),
        meta: {
            title: "分类列表"
        }
    },
    {
        path: '/user/list',
        name: '/user/list',
        component: () => import('@/views/user/list.vue'),
        meta: {
            title: "用户管理"
        }
    }
]


export const router = createRouter({
    history: createWebHistory(),
    routes,
});

//动态添加路哟方法
export function addRoutes(menus) {
    //是否有新的路由
    let hansNewRoutes = false
    const findAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            let item = asyncRouter.find(o => o.path === e.frontpath)
            //aside一级路由
            //hasRoute(name):boolean,检查一个给定名称的路由是否存在
            if (item && !router.hasRoute(item.path)){
                //添加嵌套路由，添加到admin的children：[{}]
                router.addRoute('admin',item)
                /*router.addRoute('admin',{path:item.path,component:item.component})*/
                hansNewRoutes = true
            }
            //如果存在子路由child并且长度大于零，通过e.child作为参数在调用findAddRoutesByMenus
            if (e.child && e.child.length>0){
                findAddRoutesByMenus(e.child)
            }
        })
    }
    findAddRoutesByMenus(menus)
    return hansNewRoutes
}



