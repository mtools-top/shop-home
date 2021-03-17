
import { cateList } from '../../utils/request'

const state = {
    cateList: []
};
const mutations = {
    muCateList(state, arr) {
        state.cateList = arr
    }
};
const actions = {
    acCateList(context) {
        cateList().then(res => {
            context.commit('muCateList', res.data.list)
        })
    }
}
const getters = {
    cateList(state) {
        return state.cateList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}