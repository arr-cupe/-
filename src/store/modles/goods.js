import { reqgoodList, reqgoodCont } from '../../util/request'
const state = {
    list: [],//请求回来的数据
    page: 1,//当前第几页
    size: 2,//一页展示几条数据
    total:0,//商品总数
}
const mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
    changeCont(state,num){
        state.total = num;
    },
    // 修改页码
    changePage(state,page){
        state.page = page;
    }
}
const actions = {
    reqchangeList(context, fid, sid) {
        reqgoodList({
            page: context.state.page,
            size: context.state.size,
            fid: fid,
            sid: sid
        }).then(res => {
            context.commit('changeList', res.data.list)
        })
    },
    reqchangeCont(context){
        reqgoodCont().then(res=>{
            console.log(res,123213);
            context.commit('changeCont',res.data.list[0].total);
        })
    },
    // 修改页码
    reqPage(context,page){
        context.commit('changePage',page);
        context.dispatch('reqchangeList');
    }
}
const getters = {
    list(state) {
        return state.list;
    },
    total(state){
        return state.total
    },
    page(state){
        return state.page;
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