export const allResultTahunan =  state =>{
            if (state.dataTahunIni !== null) {
                return state.dataTahunIni
            } else {
                return {
                    income: 0,
                    outcome: 0,
                    profit: 0
                }
            }
        }

export const fullDataTahunIni = state =>{
            if (state.fullDataTahunan  !== null) {
                return state.fullDataTahunan.fullData
            }
        }
export const token = state => {
            // const data = state.tokenAPI;
            if(state.tokenAPI !== null){
                return {
                    token_refresh: state.tokenAPI.token_refresh,
                    token_access: state.tokenAPI.token_access
                }
            } else {
                console.log(localStorage.getItem('token_access'))
                return {
                    token_access: localStorage.getItem('token_access'),
                    token_refresh: localStorage.getItem('token_refresh')
                }
            }
        }
export const dataBaru = state => {
            if(state.dataBaru5 !== null){

                return state.dataBaru5.sort((a, b) => {
                    return parseFloat(a.id) - parseFloat(b.id);
                }).slice(-5).sort((a, b) => {
                    return parseFloat(b.id) - parseFloat(a.id)
                })
            }
            
        }

export const allDataBulanIni = state => {
    return state.dataBulanIni

}

