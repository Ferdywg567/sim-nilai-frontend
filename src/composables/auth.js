import axios from 'axios';

export let authUser = null
export let isAuthenticated = null

export function getAuthUser() {
    axios.defaults.baseURL = 'http://localhost:8000/api';
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    axios.get('user').then(response => {
        authUser = response;
        console.log("🚀 ~ getAuthUser ~ response:", response)
        isAuthenticated = true;
    }).catch(error => {
        // if error except not authrorize, return error
        if (error.response?.status != 401) {
            authUser = error.response.data;
        }
        authUser = null
        isAuthenticated = false;
    });

}

getAuthUser();