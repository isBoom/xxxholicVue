import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './Login.vue'
import Register from './Register.vue'
import ForgotPassword from "./ForgotPassword.vue"
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
        component: Register,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
            keepAlive: true
        }
    },
]

const router = new VueRouter({
    routes
})

export default router