import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import P5ThemeView from '@/views/P5/P5ThemeView.vue'
import P5ProjectView from '@/views/P5/P5ProjectView.vue'
import P5GroupView from '@/views/P5/P5GroupView.vue'
import P5AchievementTarget from '@/views/P5/P5AchievementTarget.vue'
import GuruView from '@/views/GuruView.vue'
import StudentView from '@/views/StudentView.vue'
import StudyClassView from '@/views/StudyClassView.vue'
import UnauthorizedView from '@/views/UnauthorizedView.vue'

const routes = [
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


  // ==========
  // === P5 ===
  // ==========
  {
    path: '/proyek-p5',
    name: 'proyekP5',
    component: P5ProjectView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/tema-p5',
    name: 'temaP5',
    component: P5ThemeView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/kelompok-p5',
    name: 'kelompokP5',
    component: P5GroupView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/target-proyek-p5',
    name: 'targetProyekP5',
    component: P5AchievementTarget,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/guru',
    name: 'guru',
    component: GuruView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/siswa',
    name: 'siswa',
    component: StudentView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/kelas',
    name: 'kelas',
    component: StudyClassView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/not-authorized',
    name: 'unAuthorized',
    component: UnauthorizedView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// Global mixin or utility function
// const hasRole = (role) => {
//   const user = localStorage.getItem('user');

//   if (user == null) {
//     return false
//   }

//   const role_ids = {
//     'admin': 1,
//     'guru': 2,
//   }

//   return user.role_id == role_ids[role]; // Example: Assume the user has the role for now
// };
// login guard
router.beforeEach(async (to, from, next) => {
  // if (to.meta.auth) {
  //   if (!hasRole('admin')) {
  //     next('/admin'); // Redirect to admin page if not authorized
  //   } else if (!hasRole('guru')) {
  //     next('/user'); // Redirect to user page if not authorized
  //   } else {
  //     next(); // Allow access
  //   }
  // } else {
  //   next(); // Allow access to public routes
  // }
  // guard route if needs "auth"
  if (to.matched.some(record => record.meta.auth)) {
    // Redirect the user to the login page if not authenticated:
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

    // check role
    const user = localStorage.getItem('user');
    const role_ids = {
      'admin': 1,
      'guru': 2,
    }

    if ('role' in to.meta && user.role_id != role_ids[to.meta.role]) {
      next('/not-authorized');
    } else {
      next();
    }

    // if (to.meta.auth) {

    // }
  } else {
    next()
  }

})

export default router
