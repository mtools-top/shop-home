export default {
    acSession(context, session) {
        sessionStorage.setItem('user',session)
        context.commit('muSession',session)
    }

}