import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// 先使用插件
app.use(pinia)
app.use(router)

// 然后导入Vant
import Vant from 'vant'
app.use(Vant)

// 导入UnoCSS样式
import 'virtual:uno.css'

// 最后导入我们的全局样式，这样可以覆盖Vant的默认样式
import './style.css'

app.mount('#app')