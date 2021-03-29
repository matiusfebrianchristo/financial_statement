import moment from "moment"


// set Token JWT
export const setToken = (state, token) => {
    state.tokenAPI = {
        token_refresh: token.data.refresh,
        token_access: token.data.access
    }
}

// =============================
// Dashboard

// Set Data Tahunan
export const setDataTahunIni = (state, data) => {
    state.dataTahunIni = data
}




// Set Data Bulanan

export const setDataBulanIni = (state, data) => {
    state.dataBulanIni = data
}

// get Income, Outcome, profit tahunan
export const getInOutPro = (state, data) => {
    state.resultTahunan = data
}

// Get 5 Data terbaru
export const getLimaDataBaru = (state, data) => {
    state.dataBaru5 = data
}


// =======================================
// Laporan Keuangan
// Graphic
export const setDataGraphic = (state, data) => {
    state.graphic = data
}

// Set Data Tahunan
export const setFullDataTahunan = (state, data) => {
    state.fullDataTahunan = data
}

//  tambah transaksi
export const addTransaksi = (state, data) => {
    if (state.fullDataTahunan.fullData !== undefined) {

        const main = state.fullDataTahunan.fullData
        const month = moment(data.created_at, 'DD-MM-YYYY').format('MMMM')
        const nominal = parseInt(data.nominal)
        for (let i = 0; i < main.length; i++) {
            if (main[i].month === month) {
                if (data.tipe === 'pemasukan') {
                    state.fullDataTahunan.fullData[i].income = main[i].income + nominal
                    state.fullDataTahunan.fullData[i].profit = state.fullDataTahunan.fullData[i].income - state.fullDataTahunan.fullData[i].outcome
                } else {
                    state.fullDataTahunan.fullData[i].outcome = main[i].outcome + +data.nominal
                    state.fullDataTahunan.fullData[i].profit = state.fullDataTahunan.fullData[i].income - state.fullDataTahunan.fullData[i].outcome
                }
            }
        }



    }
    state.dataTransaksi = data
}

// action Modals
export const isAction = (state, data) => {
    state.isAction = data
}

// ==================================
// Detail Bulanan

// Clear Data
export const clearDataBulanan = (state) => {
    state.dataBulanIni = []
}

// Set Data
export const dataBulanIni = (state, data) => {
    let dataDetail;

    dataDetail = new Array(data);

    const hasil = Object.keys(dataDetail[0]).map((key) => [
        Number(key),
        dataDetail[0][key],
    ]);
    const sorted = hasil.slice();
    const dataSorted = sorted.sort((a, b) => {
        return new Date(b[1].created_at) - new Date(a[1].created_at);
    });
    state.dataBulanIni = dataSorted
}

// delete Transaksi

export const deleteTransaksi = (state, id) => {
    console.log(state.dataBulanIni)
    for (let i = 0; i < state.dataBulanIni.length; i++) {
        if (state.dataBulanIni[i][0] === id) {
            console.log(state.dataBulanIni[i])
            state.dataBulanIni.splice(i, 1)
        }
    }
}

// Edit transaksi
// GET
export const getTransaksi = (state, data) => {
    state.tempTransaksi = data
}

// Save




// Wrapper
export const isNavActive = (state) => {
    state.isNavActive = !state.isNavActive
}

export const isMNavActive = (state) => {
    state.isMNavActive = !state.isMNavActive
}