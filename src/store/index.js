import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        exclude: ["Video"],
        user: {},
        video: {},
    },
    mutations: {
        setVideo(state, val) {
            state.video = val
        },
        setUser(state, val) {
            state.user = val
        }
    },
    getters: {
        getVideo: state => state.video,
        getUser: state => state.user
    },
    actions: {

    },
    modules: {

    }
})