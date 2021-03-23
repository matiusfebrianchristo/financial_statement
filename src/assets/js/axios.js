import axios from 'axios';

axios.defaults.baseURL = 'https://pacific-woodland-15391.herokuapp.com/'
axios.defaults.headers.common['Authorization'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzMDI3NjMyLCJqdGkiOiI5ODMwYWIyNzg0NzI0ZGZjOTVhZDVlNDM3NjY4NzlmYSIsInVzZXJfaWQiOjF9.pm1WIy8nY0bEydaVqGN5T9StnhuHToZpAOBu3tAp9OU"
axios.defaults.headers.post['Content-Type'] = 'application/json'

// AXIOS INTERCEPTORS

// Request Interceptors
// axios.interceptors.request.use( config => {
//     console.log(config.url)

//     config.headers.Authorization = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzMDI3MjAyLCJqdGkiOiI1NzJmMTg3Mzg1ZDU0M2VjOWRkODBlMWZjZDc1MDc0YyIsInVzZXJfaWQiOjF9.pkkVY79fxtiu4QvVG8iLGvSL-0QMzlrrfjgMRRZWCUM"
//     return config;
// }, err => {
//     console.log(err);
// });

// Respone Interceptors
axios.interceptors.response.use( response => {
    let data = response.data;
    return data;
}, err => {
    console.log(err);
});

