import router from '@/router';
import axios from 'axios';

export function checkAuth() {
    axios.get('user').catch(error => {
        console.log("🚀 ~ axios.get ~ response:", error)
        if (error.response?.status === 401) {
            // Remove the token from local storage:
            localStorage.removeItem('token');
            // Reset the axios Authorization header:
            axios.defaults.headers.common['Authorization'] = 'Bearer';
            // Redirect the user to the login page:
            router.push({
                name: 'login',
                params: {
                    notLoggedIn: true
                },
                query: {
                    redirect: router.currentRoute.value.name
                }
            });
        }
    });
}