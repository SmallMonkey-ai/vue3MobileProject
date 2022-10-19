import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// 移动端适配
import 'lib-flexible/flexible.js';

// 引入全局样式
import '@/assets/scss/index.scss';

createApp(App).use(router).mount('#app')