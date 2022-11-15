import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HomeMain.vue'
import About from './components/AboutApp.vue'
import Login from './components/SnsLogin.vue'
import Hedge from './components/HedgeHog.vue'
import ShowImage from './components/ShowImage.vue'
import CreateImage from './components/CreateImage.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about/:id',
            name: 'aboutid',
            component: About
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
        }, {
            path: '/image/:id',
            name: 'showimage',
            component: ShowImage
        }, {
            path: '/createimg',
            name: 'createimg',
            component: CreateImage
        }
    ]
})