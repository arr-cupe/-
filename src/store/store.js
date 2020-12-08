import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import menuList from './modles/menulist'
import role from './modles/role'
import user from './modles/user'
import classify from './modles/classify'
import spec from './modles/spec'
import login from './modles/login'
export default new Vuex.Store({
    modules:{
        menuList,
        role,
        user,
        classify,
        spec,
        login
    }
})