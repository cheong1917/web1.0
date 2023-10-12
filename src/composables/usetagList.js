import {useRoute, useRouter, onBeforeRouteUpdate} from "vue-router";
import {useCookies} from "@vueuse/integrations/useCookies";

export function useTagList() {
    const route = useRoute()
    const router = useRouter()
    const cookie = useCookies()
//目前选中路由路径：v-mode
    const activeTab = ref(route.path)
//路由列表
    const tabList = ref([
        {
            title: '后台首页',
            path: '/'
        }
    ])

    function addTab(tab) {
        //判断面包屑是否存在
        let notTab = tabList.value.findIndex(t => t.path === tab.path) === -1
        if (notTab) {
            //如果不存在就push进去TabList中增加一个面包屑
            tabList.value.push(tab)
        }
        cookie.set("tabList", tabList.value)
    }

//重新在cookie中加载面包屑的数据到TabList中
    function initTabList() {
        let tbs = cookie.get("tabList")
        if (tbs) {
            tabList.value = tbs
        }
    }

    initTabList()

//监听路由发生变化
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })

    const changTabs = (t) => {
        activeTab.value = t
        router.push(t)
    }

    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        if (a === t) {
            tabs.forEach((tab, index) => {
                if (tab.path === t) {
                    const nextTabs = tabs[index + 1] || tabs[index - 1]
                    if (nextTabs) {
                        a = nextTabs.path
                    }
                }
            })
        }
        activeTab.value = a
        //filter过滤t的list
        tabList.value = tabList.value.filter(tab => tab.path !== t)
        cookie.set("tabList", tabList.value)
    }

    function handleCommand(c) {
        switch (c) {
            case "closeAll":
                tabList.value = [{
                    title: '后台首页',
                    path: '/'
                }]
                activeTab.value = "/"
                break;
            case "closeOther":
                tabList.value = tabList.value.filter(tab => tab.path === "/" || tab.path === activeTab.value)
                break;
            default:
                break;
        }
        cookie.set("tabList", tabList.value)
    }
    return {
        activeTab,
        tabList,
        changTabs,
        removeTab,
        handleCommand
    }
}