import P5ThemeView from '@/views/P5/P5ThemeView.vue'
import P5ProjectView from '@/views/P5/P5ProjectView.vue'
import P5GroupView from '@/views/P5/P5GroupView.vue'
import P5AchievementTargetView from '@/views/P5/P5AchievementTargetView.vue'
import GuruView from '@/views/GuruView.vue'
import StudentView from '@/views/StudentView.vue'
import StudyClassView from '@/views/StudyClassView.vue'

export default [
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
        component: P5AchievementTargetView,
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
];