import P5ProjectAchievementView from '@/views/P5/P5ProjectAchievementView.vue'

export default [
    {
        path: '/capaian-proyek',
        name: 'projectAchievement',
        component: P5ProjectAchievementView,
        meta: {
            auth: true,
            role: 'guru'
        }
    },
    {
        path: '/catatan-proses-proyek',
        name: 'projectAchivementNotes',
        component: P5ProjectAchievementView,
        meta: {
            auth: true,
            role: 'guru'
        }
    }
];