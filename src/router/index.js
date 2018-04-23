import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/index'

import App from '@/App'
import Login from '@/pages/login/login'
import Home from '@/pages/home/home'
import ServerList from '@/pages/serverList/serverList'
import PersonalPage from '@/pages/personalPage/personalPage'
import ImpCarInfo from '@/pages/impcarInfo/impcarInfo'
import Uservip from '@/pages/uservip/uservip'
import OrderDetails from '@/pages/orderDetails/orderDetails'
import CleaningCall from '@/pages/cleaningCall/cleaningCall'
import Scan from '@/pages/scan/scan'
import MaintainRecord from '@/pages/maintainRecord/maintainRecord'
import Confirm from '@/pages/confirm/confirm'
import washorder from '@/pages/washorder/washorder'
import Sign from '@/pages/sign/sign'

import QueryPrice from '@/pages/queryPrice/queryPrice'
import AllocationSingle from '@/pages/allocationSingle/allocationSingle'
import CardsInfo from '@/pages/cardsInfo/cardsInfo'
import ApplyRequireList from '@/pages/applyRequireList/applyRequireList'
import SeekHelp from '@/pages/seekHelp/seekHelp'
import AllocationDetailed from '@/pages/allocationDetailed/allocationDetailed'
import AllocationYes from '@/pages/allocationYes/allocationYes'


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
                },
                {
                    path: 'impCarInfo',
                    component: ImpCarInfo
                },{
                    path: 'scan',
                    component: Scan
                },
                {
                    path: 'maintainRecord',
                    component: MaintainRecord
                },
                {
                    path: 'Confirm',
                    component: Confirm
                },{
                    path: 'washorder',
                    component: washorder
                },{
                    path: 'sign',
                    component: Sign
                },
                {
                    path: 'queryPrice',
                    component: QueryPrice
                },
                {
                    path: 'allocationSingle',
                    component: AllocationSingle
                },
                {
                	path: 'cardsInfo',
                	component: CardsInfo
                },
                {
                	path: 'applyRequireList',
                	component: ApplyRequireList
                },
                {
                	path: 'seekHelp',
                	component: SeekHelp
                },
                {
                	path: 'allocationDetailed',
                	component: AllocationDetailed
                },
                {
                	path: 'allocationYes',
                	component: AllocationYes
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path.includes('login')) {
        if (localStorage.getItem('access_token')) {
            router.push('/home')
            return
        }
    }
    next()
})
export default router
