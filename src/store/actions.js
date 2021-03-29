import axios from 'axios'
import moment from 'moment'

export const getDataTahunIni = ({
    commit,
    state
}) => {
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
}
export const setFullDataTahunIni = ({
    commit
}, data) => {
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

        const result = {
            fullData: fulldataDaily,
            income: income,
            outcome: outcome,
            profit: profit,
        }

        commit('setFullDataTahunan', result)
    }
    // this.fillDataGraph(this.filldata(moment.months(), income, outcome, profit))
}
export const getDataBulanIni = ({
    commit
}, tanggal) => {
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
}
export const login = ({
    commit,
    getters
}, form) => {
    return new Promise((resolve, reject) => {
        axios.post('accounts/usertoken/', form)
            .then((res) => {
                // console.log(res)
                // console.log(data)
                commit('setToken', res)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters.token.token_access
                resolve(res)

            })
            .catch(() => reject())
    })

    // console.log(user, pass)


}
export const getInOutPro = ({
    commit
}, data) => {
    // console.log(data)
    commit('getInOutPro', data)
}
export const getLimaDataBaru = ({
    commit
}) => {
    new Promise((resolve, reject) => {
        axios.get("administration/listadministration/")
            .then(res => {
                commit('getLimaDataBaru', res.data)
                resolve(res.data)

            })
            .catch(err => reject(err))
    })
}
export const fillDataGraph = ({
    commit
}, data) => {
    commit('setDataGraphic', data)
}

export const addTransaksi = ({
    commit
}, data) => {
    console.log(data.isImg, typeof(isImg))
    new Promise((resolve, reject) => {
        return axios.post('administration/addadministration/', data.obj)
            .then(res => {
                
                const objData = {}
                if (data.isImg !== false ) {
                    for (var pair of data.obj.entries()) {
                        objData[pair[0]] = pair[1]
                        console.log(objData)
                    }
                    commit('addTransaksi', objData)
                } else {
                    commit('addTransaksi', data.obj)
                }
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const dataBulanIni = ({ commit }, data) => {
    new Promise((resolve, reject) => {
        return axios.get('administration/administrationdetail/', data)
        .then(res => {
            commit('dataBulanIni', res.data)
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
}


export const isAction = ({
    commit
}, data) => {
    commit('isAction', data)
}


export const isNavActive = ({ commit }) => {
    commit('isNavActive')
}

export const isMNavActive = ({ commit }) => {
    commit('isMNavActive')
}
