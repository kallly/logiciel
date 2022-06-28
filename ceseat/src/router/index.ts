import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RestaurantView from '../views/RestaurantView.vue'
//test path interactif restaurant
import RestaurantModel from '../models/RestaurantModel'

Vue.use(VueRouter)
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/*webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import(/*webpackChunkName: "login" */ '../views/StatisticsView.vue')
  },
  { path: '/restaurant/:id', 
    component: RestaurantView, 
    props: true 
  },
  // pour les routes avec vues nommées, vous devez définir l'option `props` pour chaque vue nommée :
  
  /*
  {
    path: '/restaurant/:id', 
    component: RestaurantView
    
  },*/
  {
    path: '/profil',
    name: 'profil'
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//export default router




import LoginComponent from "../views/LoginView.vue"
import SecureComponent from "../views/secure.vue"
import RegisterComponent from "../views/RegisterView.vue"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/secure",
            name: "secure",
            component: SecureComponent
        },
        {
          path: "/register",
          name: "register",
          component: RegisterComponent
        }
    ]
})