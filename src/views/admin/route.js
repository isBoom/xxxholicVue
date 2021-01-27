import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from './UserList.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'UserList',
    component: UserList,
    meta: { keepAlive: true }
}, {
    path: '/userList',
    component: UserList,
    meta: { keepAlive: true }
}, {
    path: '/adminList',
    name: 'AdminList',
    meta: { keepAlive: true },
    component: () =>
        import ( /* webpackChunkName: "about" */ './AdminList.vue'),
}, {
    path: '/createUser',
    name: 'CreateUser',
    meta: { keepAlive: true },
    component: () =>
        import ( /* webpackChunkName: "about" */ './CreateUser.vue'),
}, ]

const router = new VueRouter({
    routes
})

export default router