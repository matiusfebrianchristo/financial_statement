import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { resolve } from 'core-js/fn/promise'

Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        dataTahunIni: [],
        dataBulanIni: [],
        user: null,
        tokenAPI: null,
    },
    getters:{
        token: state => {
            // const data = state.tokenAPI;
            return {
                token_refresh: state.tokenAPI.token_refresh,
                token_access: state.tokenAPI.token_access
            }
        }
    },
    actions:{
       async getData(){
             const response = await axios.get('administration/administrationdataperyear/');
            console.log(response)
        },
        login({ commit, getters },  form){
            return new Promise((resolve, reject) => {
                 axios.post('accounts/usertoken/', form)
                .then( (res)=> {
                    console.log(res)
                    console.log(getters)
                    // console.log(data)
                    commit('setToken', res)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters.token.token_access
                        resolve(res)
                    
                })
                .catch(err => reject(err))
            })
            
            // console.log(user, pass)
            

        },
        cekData(state){
            console.log(state)
        },
    },
    mutations:{
        setToken(state, token){
            state.tokenAPI = {
                token_refresh : token.data.refresh,
                token_access : token.data.access
            }
            // console.log(state)
        }
    }
})