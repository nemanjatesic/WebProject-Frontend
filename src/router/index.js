import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LandingPage from '@/components/LandingPage'
import Cards from '@/components/Cards'
import Login from '@/components/Login'
import CreateUser from '@/components/CreateUser'
import UserView from '@/components/UserView'
import AdminPanel from '@/components/AdminPanel'
import CreateTicket from '@/components/CreateTicket'
import ChangeTicket from '@/components/ChangeTicket'
import CompanyView from '@/components/CompanyView'
import ChangeCompany from '@/components/ChangeCompany'
import CreateCompany from '@/components/CreateCompany'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: LandingPage
    },
    {
      path: '/karte',
      name: 'karte',
      component: Cards
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin/createUser',
      name: 'createUser',
      component: CreateUser
    },
    {
      path: '/admin/createTicket',
      name: 'createTicket',
      component: CreateTicket
    },
    {
      path: '/admin/editTicket/:ticketId',
      name: 'changeTicket',
      component: ChangeTicket
    },
    {
      path: '/viewCompany/:comapnyId',
      name: 'viewCompany',
      component: CompanyView
    },
    {
      path: '/changeCompany/:comapnyId',
      name: 'changeCompany',
      component: ChangeCompany
    },
    {
      path: '/createCompany',
      name: 'createCompany',
      component: CreateCompany
    },
    {
      path: '/admin',
      name: 'adminPanel',
      component: AdminPanel
    },
    {
      path: '/user',
      name: 'userView',
      component: UserView
    }
  ]
})
