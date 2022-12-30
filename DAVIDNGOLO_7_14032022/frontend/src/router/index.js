import { createWebHistory, createRouter } from "vue-router";
//importation des vues
import HomeView from '../views/HomeView.vue'
import ProfilView from '../views/ProfilView.vue'
import SigninView from '../views/SigninView.vue'
import FeedView from '../views/FeedView.vue'
//creation d'un tableau de routes
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
/*creation instance router,il prend comme paramètre createwebhistory*/
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router