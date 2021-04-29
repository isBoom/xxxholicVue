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
    }, {
        path: '/videoNormalList',
        name: 'VideoNormalList',
        meta: { keepAlive: true },
        component: () =>
            import ( /* webpackChunkName: "about" */ './VideoNormalList.vue'),
    }, {
        path: '/videoAuditList',
        name: 'VideoAuditList',
        meta: { keepAlive: true },
        component: () =>
            import ( /* webpackChunkName: "about" */ './VideoAuditList.vue'),
    }, {
        path: '/postVideo',
        name: 'PostVideo',
        meta: { keepAlive: true },
        component: () =>
            import ( /* webpackChunkName: "about" */ './PostVideo.vue'),
    },
    {
        path: '/comments',
        name: 'Comments',
        meta: { keepAlive: true },
        component: () =>
            import ( /* webpackChunkName: "about" */ './Comments.vue'),
    },
]

const router = new VueRouter({
    routes
})

export default router