import axios from 'axios'
import moment from 'moment'


// =====================
// Login 
export const login = ({
    commit,
    getters
}, form) => {
    return new Promise((resolve, reject) => {
        axios.post('accounts/usertoken/', form)
            .then((res) => {
                commit('setToken', res)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters.token.token_access
                resolve(res)

            })
            .catch(() => reject())
    })

}


// =======================================
// Data Tahunan

export const getDataTahunIni = ({
    commit,
    state
}) => {
    return new Promise((resolve, reject) => {
        axios.get("administration/administrationdataperyear/")
            .then(res => {

                const obj = res.data[state.tahun];
                const hasil = Object.keys(obj).map((key) => [Number(key), obj[key]]);
                commit('getInOutPro', hasil)
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


// Dashboard - 5 Data Terbaru
export const getLimaDataBaru = ({
    commit
}) => {
    return new Promise((resolve, reject) => {
        axios.get("administration/listadministration/")
            .then(res => {
                commit('getLimaDataBaru', res.data)
                resolve(res.data)

            })
            .catch(err => reject(err))
    })
}

// Grapic
export const fillDataGraph = ({
    commit
}, data) => {
    commit('setDataGraphic', data)
}



// ====================
// Data Bulanan

// Dashboard
export const getDataBulanIni = ({
    commit
}, tanggal) => {
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

// =====================================
// Detail Bulanan

// GET Params
export const getParams = ({
    commit
}, data) => {
    commit('getParams', data)
}


export const dataBulanIni = ({
    commit,
    state
}) => {

    if (localStorage.getItem('tambah_transaksi') !== 'true' && state.isAction !== 'edit') {
        commit('clearDataBulanan')
    }
    return new Promise((resolve, reject) => {
        axios.get('administration/administrationdetail/', state.params)
            .then(res => {
                commit('dataBulanIni', res.data)
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}

// Dibutuhkan untuk add dan edit transaksi
export const isAction = ({
    commit
}, data) => {
    commit('isAction', data)
}

// Delete Transaksi
export const deleteTransaksi = ({
    commit
}, id) => {

    return new Promise((resolve, reject) => {
        axios.delete(`administration/deleteadministration/?administration_id=${id}`)
            .then((res) => {
                console.log(res)
                commit('deleteTransaksi', id)
                resolve(res)
            })
            .catch(err => reject(err))
    })
}

// ============================
// add Transaksi 


export const addTransaksi = ({
    commit
}, data) => {
    return new Promise((resolve, reject) => {
        axios.post('administration/addadministration/', data.obj)
            .then(res => {

                const objData = {}
                if (data.isImg !== false) {
                    for (var pair of data.obj.entries()) {
                        objData[pair[0]] = pair[1]
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

// Edit Transaksi
// GET
export const getTransaksi = ({
    commit
}, data) => {
    commit('getTransaksi', data)
}

// SAVE
export const saveTransaksi = ({
    commit,
    dispatch,
    state
}, result) => {

    return new Promise((resolve, reject) => {
        axios
            .patch(`administration/updateadministration/${result.id}/`, result.data)
            .then(res => {
                dispatch('dataBulanIni', state.params)
                commit('saveTransaksi', result.data)
                resolve(res)
            })
            .catch(err => reject(err))
    })
}

// ==============================
// Nav Wraper
export const isNavActive = ({
    commit
}) => {
    commit('isNavActive')
}

export const isMNavActive = ({
    commit
}) => {
    commit('isMNavActive')
}