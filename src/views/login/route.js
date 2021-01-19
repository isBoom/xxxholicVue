import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './Login.vue'
import Register from './Register.vue'
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
        path: '/',
        name: 'Register',
        component: Register,
        meta: {
            keepAlive: true
        }
    },
]

const router = new VueRouter({
    routes
})

export default router