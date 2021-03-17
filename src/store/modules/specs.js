import { specsCount, specsList } from "../../utils/request";

const state = {
    specsCount: 0,
    specsList:[],
    page:1,
    size:2
};
const mutations = {
    muSpecsCount(state, num) {
        state.specsCount = num
    },
    muSpecsList(state, arr){
        state.specsList = arr
    },
    muPage(state, num){
        state.page = num
    }
};
const actions = {
    acSpecsCount(context) {
        specsCount().then(res => {
            context.commit('muSpecsCount',res.data.list[0].total)
        })
    },
    acSpecsList(context) {
        let data = {
            page:context.state.page,
            size:context.state.size
        }
        specsList(data).then(res => {
            context.commit('muSpecsList',res.data.list)
        })
    },
};
const getters = {
    specsCount(state) {
        return state.specsCount
    },
    specsList(state) {
        return state.specsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}