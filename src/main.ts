import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vant from 'vant';
import { createDrawEmptyPlugin } from 'draw-empty';
import router from './router';
import App from './App.vue';

// 导入UnoCSS样式
import 'virtual:uno.css';

// 导入Vant样式
import 'vant/lib/index.css';

const app = createApp(App);
const pinia = createPinia();

// 使用插件
app.use(pinia);
app.use(router);
app.use(Vant);
app.use(createDrawEmptyPlugin({ accentColor: '#2563EB' }));

app.mount('#app');