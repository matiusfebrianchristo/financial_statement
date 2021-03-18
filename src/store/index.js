import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        dataTahunIni: [],
        dataBulanIni: [],
        detailDataTahunan: [],
        incomeResult: null,
        outcomeResult: null,
        profitResult: null,
        dataBaru5: null,
        user: null,
        tokenAPI: null,
    },
    getters: {
        token: state => {
            // const data = state.tokenAPI;
            return {
                token_refresh: state.tokenAPI.token_refresh,
                token_access: state.tokenAPI.token_access
            }
        },
        dataBaru: state => {
            if(state.dataBaru5 !== null){

                return state.dataBaru5.sort((a, b) => {
                    return parseFloat(a.id) - parseFloat(b.id);
                }).slice(-5).sort((a, b) => {
                    return parseFloat(b.id) - parseFloat(a.id)
                })
            }
            
        }
    },
    actions: {
        getDataTahunIni({
            commit
        }) {
            return new Promise((resolve, reject) => {
                axios.get("administration/administrationdataperyear/")
                    .then(res => {
                        const obj = res.data[new Date().getFullYear()];
                        const hasil = Object.keys(obj).map((key) => [Number(key), obj[key]]);
                        commit('setDataTahunIni', hasil)
                        resolve(hasil)
                    })
                    .catch(err => reject(err))
            })
        },
        getDataBulanIni({
            commit
        }, tanggal) {
            console.log(tanggal)
            return new Promise((resolve, reject) => {
                axios.get(`administration/administrationdetail/?year=${tanggal.tahun}&month=${tanggal.bulan}`)
                    .then(res => {
                        const data = Object.keys(res.data).map((key) => [
                            Number(key),
                            res.data[key],
                        ]);
                        commit('setDataBulanIni', data)
                        resolve(data)
                    })
                    .catch(err => reject(err))
            })
        },
        login({
            commit,
            getters
        }, form) {
            return new Promise((resolve, reject) => {
                axios.post('accounts/usertoken/', form)
                    .then((res) => {
                        console.log(res)
                        // console.log(data)
                        commit('setToken', res)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters.token.token_access
                        resolve(res)

                    })
                    .catch(() => reject())
            })

            // console.log(user, pass)


        },

        getInOutPro({
            commit
        }, data) {
            commit('getInTahunan', data.income)
            commit('getOutTahunan', data.outcome)
            commit('getProTahunan', data.profit)
        },

        getLimaDataBaru({
            commit
        }) {
            new Promise((resolve, reject) => {
                axios.get("administration/listadministration/")
                    .then(res => {
                        commit('getLimaDataBaru', res.data)
                        resolve(res.data)
                        
                        
                    })
                    .catch(err => reject(err))
            })
                
            
        }

    },
    mutations: {
        setToken(state, token) {
            state.tokenAPI = {
                token_refresh: token.data.refresh,
                token_access: token.data.access
            }
        },
        setDataBulanIni(state, data) {
            state.dataBulanIni = data
        },
        setDataTahunIni(state, data) {
            state.dataTahunIni = data
        },
        getInTahunan(state, data) {
            state.incomeResult = data
        },
        getOutTahunan(state, data) {
            state.outcomeResult = data
        },
        getProTahunan(state, data) {
            state.profitResult = data
        },
        getLimaDataBaru(state, data){
            state.dataBaru5 = data
        }
    }
})