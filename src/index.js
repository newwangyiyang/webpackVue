import Vue from 'vue'
import App from './App'
import router from './router'
// 引入初始化样式
import '@/assets/css/reset.css'
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

