import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HomeMain.vue'
import About from './components/AboutApp.vue'
import Login from './components/SnsLogin.vue'
import Hedge from './components/HedgeHog.vue'

//import CreateImage from './components/CreateImage.vue'
import SearchRes from './components/SearchResult.vue'
import UserPage from './components/UserPage.vue'
import MyPage from './components/MyPage.vue'
import ModyfyImage from './components/ModifyImage.vue'
import ModifyImages from './components/ModifyImages.vue'
import MyFavoriteAll from './components/MyFavorite_all.vue'

import ContestPage from './components/ContestPage.vue'
import ShowImages from './components/ShowImages.vue'
import CreateImages from './components/CreateImages.vue'
Vue.use(Router)

export default new Router({
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(savedPosition)
                })
            })
        } else {
            return { x: 0, y: 0 }
        }
    },
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
            path: '/images/:id',
            name: 'showimages',
            component: ShowImages
        },
        {
            path: '/createimg',
            name: 'createimg',
            component: CreateImages
        }, {
            path: '/search',
            name: 'search',
            component: SearchRes
        }, {
            path: '/user/:id',
            name: 'user',
            component: UserPage
        }, {
            path: '/mypage',
            name: 'mypage',
            component: MyPage
        }, {
            path: '/mimage/:id',
            name: 'modifyimage',
            component: ModyfyImage
        }, {
            path: '/myfavoriteall',
            name: 'myfavoriteall',
            component: MyFavoriteAll
        }, {
            path: '/contest',
            name: 'contest',
            component: ContestPage
        }, {
            path: '/showimages/:id',
            name: 'showimages',
            component: ShowImages
        }, {
            path: '/createimages',
            name: 'createimages',
            component: CreateImages
        }, {
            path: '/modifyimages/:id',
            name: 'modifyimages',
            component: ModifyImages
        }
    ]
})