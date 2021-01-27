import Vue from 'vue'
import VueRouter from 'vue-router'
import MyVideo from './MyVideo.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'MyVideo',
        component: MyVideo,
    },
    {
        path: '/postVideo',
        name: 'PostVideo',
        //component: Home
        component: () =>
            import ( /* webpackChunkName: "about" */ './PostVideo.vue')
    },
    {
        path: '/audit',
        name: 'Audit',
        //component: Home
        component: () =>
            import ( /* webpackChunkName: "about" */ './Audit.vue')
    },
    {
        path: '/history',
        name: 'History',
        //component: Home
        component: () =>
            import ( /* webpackChunkName: "about" */ './History.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router