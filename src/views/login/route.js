import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './Login.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            keepAlive: true
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ './Register.vue')
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPassword',
        meta: {
            keepAlive: true
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ './ForgotPassword.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router