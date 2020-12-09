import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import menuList from './modles/menulist'
import role from './modles/role'
import user from './modles/user'
import classify from './modles/classify'
import spec from './modles/spec'
import login from './modles/login'
import goods from './modles/goods'
import banner from './modles/banner'
import seckill from './modles/seckill'
export default new Vuex.Store({
    modules:{
        menuList,
        role,
        user,
        classify,
        spec,
        login,
        goods,
        banner,
        seckill
    }
})