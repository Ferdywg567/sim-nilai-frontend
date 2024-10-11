import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import admin_routes from './admin_routes';
import guru_routes from './guru_routes';

let default_routes = [
  {
    path: '/',
    name: 'home',
    component: () => {
      router.push({ name: 'login' })
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      auth: true,
      // role: 'admin'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/not-authorized',
    name: 'unAuthorized',
    component: UnauthorizedView
  },
];

const routes = default_routes.concat(admin_routes, guru_routes);


const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// login guard
router.beforeEach(async (to, from, next) => {
  // guard route if needs "auth"
  if (to.matched.some(record => record.meta.auth)) {
    // Redirect the user to the login page if not authenticated:
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') == null) {

      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization'] = 'Bearer';

      next({
        name: 'login',
        params: {
          notLoggedIn: true
        },
        query: {
          redirect: router.currentRoute.value.name
        }
      })
    }

    next()
    // check role
    // const user = localStorage.getItem('user');
    // const role_ids = {
    //   'admin': 1,
    //   'guru': 2,
    // }

    // if ('role' in to.meta && user.role_id != role_ids[to.meta.role]) {
    //   next('/not-authorized');
    // } else {
    //   next();
    // }
  } else {
    next()
  }

})

export default router
