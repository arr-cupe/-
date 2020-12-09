import {reqsecklist} from '../../util/request'
const state = {
    list:[],
}
const mutations = {
    changelist(state,arr){
        state.list = arr;
    }
}
const actions = {
    reqchangelist(context){
        reqsecklist().then(res=>{
            context.commit('changelist',res.data.list);
        })
    }
}
const getters = {
    list(state){
        return state.list;
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}