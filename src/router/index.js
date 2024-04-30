import { createRouter, createWebHistory } from 'vue-router'
import UserView from '@/views/UserView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
    // component: () => {
    //   router.push({name: 'login'})
    // }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// check auth
// router.beforeEach(async (to, from) => {

//   let isAuthenticated = false;
//   if (
//     // make sure the user is authenticated
//     !isAuthenticated &&
//     // ❗️ Avoid an infinite redirect
//     to.name !== 'login'
//   ) {
//     // redirect the user to the login page
//     return { name: 'login' }
//   }
// })

export default router
