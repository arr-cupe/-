import { reqSpecsList, reqSpecsCount } from '../../util/request'
const state = {
    list: [],
    page: 1,
    size: 2,
    total:0
}
const mutations = {
    changelist(state, arr) {
        state.list = arr;
    },
    changeCont(state,num){
        state.total = num;
    },
    // 修改页码
    changecur(state,page){
        state.page = page;
    }
}
const actions = {
    reqchangeList(context) {
        reqSpecsList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            context.commit('changelist', res.data.list);
        })
    },
    reqchangeCont(context){
        reqSpecsCount().then(res=>{
            context.commit('changeCont',res.data.list[0].total);
        })
    },
    reqchangecur(context,page){
        context.commit('changecur',page);
        context.dispatch('reqchangeList');
    }
}
const getters = {
    list(state) {
        return state.list
    },
    page(state){
        return state.page
    },
    size(state){
        return state.size
    },
    total(state){
        return state.total
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}