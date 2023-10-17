import {createApp} from 'vue'
import {router} from "./router/index.js";
import App from './App.vue'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
import pinia from "@/store/index.js";
import "./permission.js"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "nprogress/nprogress.css"
import 'element-plus/theme-chalk/display.css'
import 'virtual:uno.css'

const app = createApp(App)
app.use(router).use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
