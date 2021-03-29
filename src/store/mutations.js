import moment from "moment"

export const setToken = (state, token) => {
            state.tokenAPI = {
                token_refresh: token.data.refresh,
                token_access: token.data.access
            }
        }
export const setDataBulanIni = (state, data) => {
            state.dataBulanIni = data
        }
export const setDataTahunIni = (state, data) => {
            state.dataTahunIni = data
        }
export const getInOutPro = (state, data) => {
            state.resultTahunan = data
        }
export const getLimaDataBaru = (state, data) => {
            state.dataBaru5 = data
        }
export const setDataGraphic = (state, data) => {
            state.graphic = data
        }
export const setFullDataTahunan = (state, data) =>{
            state.fullDataTahunan = data
        }

export const addTransaksi = (state, data) => {
    const main = state.fullDataTahunan.fullData
    const month = moment(data.created_at, 'DD-MM-YYYY').format('MMMM')
    const nominal = parseInt(data.nominal)
    for (let i = 0;  i < main.length; i++) {
        if(main[i].month === month){
            if(data.tipe === 'pemasukan'){
                state.fullDataTahunan.fullData[i].income = main[i].income +  nominal
                state.fullDataTahunan.fullData[i].profit = state.fullDataTahunan.fullData[i].income - state.fullDataTahunan.fullData[i].outcome
            } else {
                state.fullDataTahunan.fullData[i].outcome = main[i].outcome + + data.nominal
                state.fullDataTahunan.fullData[i].profit = state.fullDataTahunan.fullData[i].income - state.fullDataTahunan.fullData[i].outcome
            }
        }
        
    }
    state.dataTransaksi = data
}

export const dataBulanIni = (state, data) => {
    state.dataBulanIni = data
}

export const isAction = (state, data) => {
    state.isAction = data
}

export const isNavActive = (state) => {
    state.isNavActive = !state.isNavActive 
}

export const isMNavActive = (state) => {
    state.isMNavActive = !state.isMNavActive 
}
    