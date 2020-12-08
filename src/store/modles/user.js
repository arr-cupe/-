import { reqGanterList, reqGanterListC } from '../../util/request'
const state = {
    list: [],//请求回来的数据
    size: 2,//一页要展示数据的条数
    page: 1,//当前第几页
    total: 0//请求回来数据的总条数
}
const mutations = {
    requserlist(state, arr) {
        state.list = arr
    },
    // 获取页码数
    changeCont(state, num) {
        state.total = num;
    },
    // 修改当前页码数
    changedit(state, page) {
        state.page = page;
    }
}
const actions = {
    // 请求列表页数据
    requestuserlist(context) {
        reqGanterList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            console.log(res);
            context.commit('requserlist', res.data.list)
        })
    },
    // 请求数据的总条数
    reqchangeCont(context) {
        reqGanterListC().then(res => {
            context.commit('changeCont', res.data.list[0].total)
        })
    },
    // 修改页码数
    changedits(context,page){
        context.commit('changedit',page);
        context.dispatch('requestuserlist');
    }
}
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    page(state){
        return state.page
    },
    size(state){
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}