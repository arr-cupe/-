import {reqCateList} from '../../util/request'
const state ={
    list:[]
}
const mutations = {
    reqcate(state,arr){
        state.list = arr;
    }
}
const actions = {
    requestCate(context,pid){
        reqCateList({istree:true,pid:pid}).then(res=>{
            console.log(res);
            context.commit('reqcate',res.data.list);
        })
    }
}
const getters ={
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}