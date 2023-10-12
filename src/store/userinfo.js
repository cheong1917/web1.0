import {defineStore} from "pinia";
import {getinfo, login} from "@/api/adminLogin.js";
import {SetToken, RemoveToken} from "@/utils/auth.js";
import {useCookies} from "@vueuse/integrations/useCookies";

export const useUserinfo = defineStore('userinfo', () => {
    //用户信息
    const user = ref({})

    //侧边宽度
    const asideWidth = ref("250px")
    //菜单信息
    const menus = ref([])

    const ruleNames = ref([])

    function SET_USERINFO(Userinfo) {
        user.value = Userinfo
    }

    function Login(username, password) {
        return new Promise((resolve, reject) => {
            login(username, password).then(res => {
                SetToken(res.token)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    function GETInfo() {
        return new Promise((resolve, reject) => {
            getinfo().then(res2 => {
                SET_USERINFO(res2)
                SET_MENUS(res2.menus)
                SET_RULENames(res2.ruleNames)
                resolve(res2)
            }).catch(err => reject(err))
        })
    }

    function logout() {
        const cookie = useCookies()
        cookie.remove("tabList")
        RemoveToken()
        SET_USERINFO({})
    }

    //展开，收起侧边
    function handelAsideWidth() {
        asideWidth.value = asideWidth.value === "250px" ? "64px" : "250px"
    }


    function SET_MENUS(Menus) {
        menus.value = Menus
    }

    function SET_RULENames(rulenames) {
        ruleNames.value = rulenames
    }

    return {
        user,
        asideWidth,
        menus,
        ruleNames,
        GETInfo,
        Login,
        logout,
        handelAsideWidth,
    }
})


