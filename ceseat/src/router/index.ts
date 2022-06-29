import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RestaurantView from '../views/RestaurantView.vue'
//test path interactif restaurant
import SecureComponent from "../views/secure.vue"
import RegisterComponent from "../views/RegisterView.vue"
import EditComponent from "../views/EditProfilView.vue"
import OrderView from "../views/OrderView.vue"
Vue.use(VueRouter)
const routes: Array<RouteConfig> = [
  
{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home',
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
  {
    path: "/create/restaurant",
    name: "createRestaurant",
    component: () => import('../views/CreateRestaurantView.vue')
  },
  {
    path: "/edit/restaurant",
    name: "editRestaurant",
    component: () => import('../views/EditRestaurantView.vue')
  },
  {
    path: "/create/product",
    name: "createProduct",
    component: () => import('../views/CreateProductView.vue')
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
},
{
  path: "/edit",
  name: "edit",
  component: EditComponent
},
{
  path: "/order",
  name: "order",
  component: OrderView
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

export default router





