
// First, import the necessary modules and libraries:
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Set up axios globally:
window.axios = axios;
// Configure the default headers for axios:
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Define the base URL for all axios requests:
axios.defaults.baseURL = 'http://89.116.50.182/api';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
// If there's a token in the localStorage, set it as the default Authorization header:
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

// Handle token expiration or invalid tokens:
axios.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = 'Bearer';

            // Redirect the user to the login page:
            router.push({
                name: 'login',
                params: {
                    notLoggedIn: true
                },
                query: {
                    redirect: router.currentRoute.value.path
                }
            });
        }

        return Promise.reject(error);
    }
);

// Create and mount the Vue app:

const app = createApp(App);
app.use(router);
app.mount('#app');