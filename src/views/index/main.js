import Vue from 'vue'
import App from './App.vue'
import router from './route.js'
import store from '../../store'
Vue.config.productionTip = false
    //vueBeauty
import vueBeauty from 'vue-beauty'
import 'vue-beauty/package/style/vue-beauty.min.css'
Vue.use(vueBeauty)
    //element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')