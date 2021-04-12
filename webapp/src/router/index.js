import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/HomeView';
import Login from '../views/auth/Login';
import buscarNormas from '../views/normas/BuscarNorma';
// import PageNotFound from '../views/core/PageNotFound';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: "home"
  },
  {
    path: '/buscar-normas',
    component: buscarNormas,
    name: "buscarNormas"
  }, {
    path: '/login',
    component: Login,
    name: "login"
  },
  {
    path: "*",
    name: "404",
    redirect: {
      name: "home"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
