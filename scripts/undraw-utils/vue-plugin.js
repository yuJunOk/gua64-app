/**
 * Vue 3 插件 - 简化 unDraw 插图使用
 * 使用方法:
 *   import { createApp } from 'vue'
 *   import UndrawPlugin from '@gua64/undraw-downloader/vue-plugin'
 *
 *   const app = createApp(App)
 *   app.use(UndrawPlugin, { color: '#2563EB' }) // 可选：设置主题色
 *   app.mount('#app')
 *
 * 在模板中使用:
 *   <UndrawIllustration name="meditation" />
 *   <UndrawIllustration name="meditation" color="#EF4444" />
 */

// 使用动态导入 Vue，避免打包时依赖
const UndrawIllustration = {
    name: 'UndrawIllustration',
    props: {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: null // 使用全局配置或默认紫色
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        height: {
            type: [String, Number],
            default: 'auto'
        }
    },
    setup(props, { inject }) {
        // 获取全局配置的颜色
        const globalColor = inject('undrawColor', null);

        return {
            svgUrl: `@/assets/undraw-illustrations/${props.name}.svg`,
            themeColor: props.color || globalColor || '#6c63ff'
        };
    },
    template: `
        <img 
            class="undraw-illustration" 
            :src="svgUrl" 
            :style="{ width, height }"
            loading="lazy"
        />
    `
};

// 默认导出插件
const UndrawPlugin = {
    install(app, options = {}) {
        // 全局配置
        app.config.globalProperties.$undrawColor = options.color || '#6c63ff';

        // 注册组件
        app.component('UndrawIllustration', UndrawIllustration);

        // 提供全局方法
        app.provide('undrawColor', options.color || '#6c63ff');
    }
};

// 支持 CommonJS 和 ES Module
module.exports = UndrawPlugin;
module.exports.UndrawIllustration = UndrawIllustration;
module.exports.default = UndrawPlugin;

// ES Module 兼容
if (typeof exports === 'object' && typeof module !== 'undefined') {
    exports.default = UndrawPlugin;
    exports.UndrawIllustration = UndrawIllustration;
}