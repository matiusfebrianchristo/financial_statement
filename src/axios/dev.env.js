import axios from 'axios'

const baseURL= 'https://glacial-coast-08306.herokuapp.com/api/v1/';

const http = axios.create({
    baseURL: process.env.baseURL
})
