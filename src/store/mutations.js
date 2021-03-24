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
    