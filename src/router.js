import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HomeMain.vue'
import About from './components/AboutApp.vue'
import Login from './components/LoginMain.vue'
import Hedge from './components/HedgeHog.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/test',
            name: 'hedgehog',
            component: Hedge
        }
    ]
})