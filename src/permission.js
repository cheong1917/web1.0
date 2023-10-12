import {router, addRoutes} from "@/router/index.js";
import {GetToken} from "@/utils/auth.js";
import {toast} from "@/utils/Putil.js";
import {useUserinfo} from "@/store/userinfo.js";
import {showFullLoading, hideFullLoading} from "@/utils/Putil.js";

//判断是否已经有userinfo，防止反复获取
let hasGetInfo = false
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    showFullLoading()

    const token = GetToken()
    const store = useUserinfo()
    if (!token && to.path !== "/login") {
        toast("请先登录", "error")
        return next({path: "/login"})
    }
    if (token && to.path === "/login") {
        toast("请勿重复登录", "warning")
        return next({path: from.path ? from.path : "/"})
    }
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        let {menus} = await store.GETInfo()
        //动态添加路由
        hasNewRoutes = addRoutes(menus)
        hasGetInfo=true
    }
    let title = "Test-" + (to.meta.title ? to.meta.title : "")
    document.title = title
    hasNewRoutes ? next(to.fullPath) : next()
    /*next()*/
})
//全局后置守卫
router.afterEach((to, from) => {
    hideFullLoading()
})