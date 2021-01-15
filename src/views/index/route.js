import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/anime',
        name: 'Anime',
        meta: {
            keepAlive: true
        },
        //component: Home
        component: () =>
            import ( /* webpackChunkName: "about" */ './Anime.vue')
    },
    {
        path: '/movie',
        name: 'Movie',
        meta: {
            keepAlive: true
        },
        //component: Home
        component: () =>
            import ( /* webpackChunkName: "about" */ './Movie.vue')
    },
    {
        path: '/funcy',
        name: 'Funny',
        meta: {
            keepAlive: true
        },
        // component: Home
        component: () =>
            import ( /* webpackChunkName: "about" */ './Funny.vue')
    },
    {
        path: '/other',
        name: 'Other',
        meta: {
            keepAlive: true
        },
        //component: Home
        component: () =>
            import ( /* webpackChunkName: "about" */ './Other.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router