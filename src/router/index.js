import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import Login from '@/pages/login/login'
import Home from '@/pages/home/home'
import ServerList from '@/pages/serverList/serverList'
import PersonalPage from '@/pages/personalPage/personalPage'

Vue.use(Router)

export default new Router({
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
                },{
                    path: 'personalPage',
                    component: PersonalPage
                }
            ]
        }
    ]
})
