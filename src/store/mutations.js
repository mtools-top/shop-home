const state = {
    session:''
};
const mutations = {
    muSession(state,session){
        state.session=session
    }
};
const getters = {
    session(state){
        return state.session
    }
};

module.exports = {
    state,
    mutations,
    getters,
}
