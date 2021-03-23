import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

// import login from './masuk/masuk.js'


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        tahun: new Date().getFullYear(),
        dataTahunIni: [],
        dataBulanIni: [],
        detailDataTahunan: [],
        fullDataTahunan: [],
        resultTahunan: null,
        graphic: null,
        dataBaru5: null,
        user: null,
        tokenAPI: null,
    },
    getters: {
        allResultTahunan: state =>{
            if (state.resultTahunan !== null) {
                return state.resultTahunan
            } else {
                return {
                    income: 0,
                    outcome: 0,
                    profit: 0
                }
            }
        },

        fullDataTahunIni: state =>{
            if (state.fullDataTahunan  !== null) {
                return state.fullDataTahunan.fullData
            }
        },



        token: state => {
            // const data = state.tokenAPI;
            if(state.tokenAPI !== null){
                return {
                    token_refresh: state.tokenAPI.token_refresh,
                    token_access: state.tokenAPI.token_access
                }
            } else {
                return {
                    token_access: localStorage.getItem('token_access'),
                    token_refresh: localStorage.getItem('token_refresh')
                }
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
            commit, state
        }) {
            return new Promise((resolve, reject) => {
                axios.get("administration/administrationdataperyear/")
                    .then(res => {
                        
                        const obj = res.data[state.tahun];
                        const hasil = Object.keys(obj).map((key) => [Number(key), obj[key]]);
                        commit('setDataTahunIni', hasil)
                        resolve(hasil)
                    })
                    .catch(err => reject(err))
            })
        },
        setFullDataTahunIni({commit}, data){
        let bulan;
          const income = [];
          const outcome = [];
          const profit = [];

          const fulldataDaily = [];
          for (let i = 0; i < data.length; i++) {
            bulan = data[i][0];
            income.push(data[i][1].income);
            outcome.push(data[i][1].outcome);
            profit.push(data[i][1].profit);
            fulldataDaily.push({
              income: income[i],
              outcome: outcome[i],
              profit: profit[i],
              month: (data[i][1].month = moment()
                .locale("id")
                .month(bulan - 1)
                .format("MMMM")),
            })

            const result =  {
                fullData: fulldataDaily,
                income: income,
                outcome: outcome,
                profit: profit,
            }

            commit('setFullDataTahunan', result)
          }
        // this.fillDataGraph(this.filldata(moment.months(), income, outcome, profit))
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
            // console.log(data)
            commit('getInOutPro', data)
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
        },

        fillDataGraph({commit}, data){
            commit('setDataGraphic', data)
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
        getInOutPro(state, data){
            state.resultTahunan = data
        },
        getLimaDataBaru(state, data){
            state.dataBaru5 = data
        },
        setDataGraphic(state, data){
            state.graphic = data
        },
        setFullDataTahunan(state, data){
            state.fullDataTahunan = data
        }
    },
    
})