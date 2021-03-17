
import {menuList} from '../../utils/request'

const state ={
    menuList:[]
};
const mutations ={
    muMenuList(state,arr){
        state.menuList = arr
    }
};
const actions ={
    acMenuList(context){
        menuList().then(res=>{
            if(res.data.list==null){
                context.commit('muMenuList',[])
                return
            }
            context.commit('muMenuList',res.data.list)
        })

    }
};
const getters ={
    menuList(state){
        return state.menuList
    }
};
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}