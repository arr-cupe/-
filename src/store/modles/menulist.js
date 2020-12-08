import { reqMenuList } from '../../util/request'
const state = {
    list: [],
}
const mutations = {
    reqMeunli(state, arr) {
        state.list = arr
    }
}
const actions = {
    requestMeunList(context) {
        reqMenuList({ istree: true }).then(res => {
            context.commit('reqMeunli', res.data.list)
        })
    },

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