const state = {
    list:sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):{},
}
const mutations = {
    reqRoleLi(state, obj) {
        state.list = obj
        sessionStorage.setItem('list',JSON.stringify(obj));
    }
}
const actions = {
    requestRoleList(context,obj) {
        context.commit('reqRoleLi',obj)
    }
}
const getters = {
    list(state) {
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}