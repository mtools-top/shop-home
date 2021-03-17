import { getRoleList} from "../../utils/request";
const state = {
    roleList:[],
};
const mutations = {
    muRoleList(state,arr){
        state.roleList = arr
    }
};
const actions = {
    
    acRoleList(context){
        getRoleList().then(res=>{
            context.commit('muRoleList',res.data.list)
        })
    }
};
const getters = {
    roleList(state){
        return state.roleList
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}