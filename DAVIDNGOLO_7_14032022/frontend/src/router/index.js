


import { createWebHistory, createRouter } from "vue-router";
import HomeView from '../views/HomeView.vue'
import ProfilView from '../views/ProfilView.vue'
import SigninView from '../views/SigninView.vue'
import FeedView from '../views/FeedView.vue'



const routes = [

  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profilView',
    name: 'profilView',
    component: ProfilView


  },
  {
    path: '/signin',
    name: 'signinView',
    component: SigninView

  },
  {
    path: '/FeedView',
    name: 'FeedView',
    component: FeedView

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router