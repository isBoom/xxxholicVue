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
    //VideoPlayer
import VideoPlayer from "vue-video-player"
import "vue-video-player/src/custom-theme.css"
import "video.js/dist/video-js.css"
Vue.use(VideoPlayer)
    //
new Vue({
    router,
    store,
    VideoPlayer,
    render: h => h(App)
}).$mount('#app')