import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/index'

import App from '@/App'
import Login from '@/pages/login/login'
import Home from '@/pages/home/home'
import ServerList from '@/pages/serverList/serverList'
import PersonalPage from '@/pages/personalPage/personalPage'
import Uservip from '@/pages/uservip/uservip'
import OrderDetails from '@/pages/orderDetails/orderDetails'
import CleaningCall from '@/pages/cleaningCall/cleaningCall'



Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: App,
            redirect: '/login',
            children: [
                {
                    path: 'login',
                    component: Login
                },
                {
                    path: 'home',
                    component: Home
                },
                {
                    path: 'serverlist',
                    component: ServerList
                },
                {
                    path: 'personalPage',
                    component: PersonalPage
                },
                {
                    path: 'uservip',
                    component: Uservip
                },
                {
                    path: 'orderDetails',
                    component: OrderDetails
                },
                {
                    path: 'cleaningCall',
                    component: CleaningCall
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log(store)
    if (to.path.includes('login')) {
        if (store.getters.isLogin) {
            router.push('/home')
            return
        }
    }
    next()
})
export default router
