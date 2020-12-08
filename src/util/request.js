import axios from 'axios'
import qs from 'qs'

axios.interceptors.response.use(res => {
    console.log(`=========请求的地址是:${res.config.url}============`);
    console.log(res);
    return res;
})
const bufUrl = '/api'
// 添加
export const reqMenuAdd = (data) => {
    return axios({
        url: bufUrl + '/api/menuadd',
        method: 'POST',
        data: data
    })
}

// 菜单列表 
export const reqMenuList = (data) => {
    return axios({
        url: bufUrl + '/api/menulist',
        method: 'GET',
        params: data
    })
}

// 菜单获取（一条）
export const reqMenuListOne = (id) => {
    return axios({
        url: bufUrl + '/api/menuinfo',
        method: 'GET',
        params: id
    })
}
// 菜单修改
export const reqMenuListDit = (data) => {
    return axios({
        url: bufUrl + '/api/menuedit',
        method: 'post',
        data: data
    })
}
// 删除数据
export const reqMenuListDel = (data) => {
    return axios({
        url: bufUrl + '/api/menudelete',
        method: 'POST',
        data: data
    })
}

// ---------------------角色管理--------------
// 角色添加
export const reqRoleAdd = (data) => {
    return axios({
        url: bufUrl + '/api/roleadd',
        method: 'POST',
        data: data
    })
}

// 角色列表
export const reqRoleList = () => {
    return axios({
        url: bufUrl + '/api/rolelist',
        method: 'get',
    })
}
// 获取一条数据
export const reqRoleListOne = (id) => {
    return axios({
        url: bufUrl + '/api/roleinfo',
        method: 'get',
        params: id
    })
}
// 角色修改
export const reqRoleListDit = (id) => {
    return axios({
        url: bufUrl + '/api/roleedit',
        method: 'post',
        data: id
    })
}
// 删除数据
export const reqRoleListDel = (id) => {
    return axios({
        url: bufUrl + '/api/roledelete',
        method: 'post',
        data: id
    })
}



// ---------------管理员管理--------------
// 管理员添加
export const reqGanterAdd = (data) => {
    return axios({
        url: bufUrl + '/api/useradd',
        method: 'post',
        data: data
    })
}
// 管理员列表
export const reqGanterList = (data) => {
    return axios({
        url: bufUrl + '/api/userlist',
        method: 'get',
        params: data
    })
}


// 管理员获取（一条）
export const reqGanterListOne = (data) => {
    return axios({
        url: bufUrl + '/api/userinfo',
        method: 'get',
        params: data
    })
}

// 管理员修改
export const reqGanterListDit = (data) => {
    return axios({
        url: bufUrl + '/api/useredit',
        method: 'POST',
        data: data
    })
}

// 删除管理员数据
export const reqGanterListDel = (data) => {
    return axios({
        url: bufUrl + '/api/userdelete',
        method: 'POST',
        data: data
    })
}

// 管理员总数（用于计算分页）
export const reqGanterListC = () => {
    return axios({
        url: bufUrl + '/api/usercount',
        method: 'GET',
    })
}

// 管理员登录
export const reqLogin = (data) => {
    return axios({
        url: bufUrl + '/api/userlogin',
        method: 'POST',
        data:data
    })
}


// ------------------商品分类管理---------------------
// 商品分类添加
export const reqCateAdd = (data) => {
    var from = new FormData();
    for (let i in data) {
        from.append(i, data[i]);
    }
    return axios({
        url: bufUrl + '/api/cateadd',
        method: 'POST',
        data: from
    })
}

// 商品分类列表
export const reqCateList = (params) => {
    return axios({
        url: bufUrl + '/api/catelist',
        method: 'GET',
        params: params
    })
}

// 获取一条商品数据
export const reqCateListOne = (id) => {
    return axios({
        url: bufUrl + '/api/cateinfo',
        method: 'GET',
        params: id
    })
}

//修改数据
export const reqCateDit = (data) => {
    var from = new FormData();
    for (let i in data) {
        from.append(i, data[i]);
    }
    return axios({
        url: bufUrl + '/api/cateedit',
        method: 'POST',
        data: from
    })
}
// 删除数据
export const reqCateDel = (id) => {
    return axios({
        url: bufUrl + '/api/catedelete',
        method: 'POST',
        data: id
    })
}

// --------------商品规格管理--------
// 商品规格添加
export const reqSpecsAdd = (data) => {
    return axios({
        url: bufUrl + '/api/specsadd',
        method: 'POST',
        data: data
    })
}

// 商品规格列表
export const reqSpecsList = (params) => {
    return axios({
        url: bufUrl + '/api/specslist',
        method: 'GET',
        params: params
    })
}
// 请求一条数据
export const reqSpecsListOne = (id) => {
    return axios({
        url: bufUrl + '/api/specsinfo',
        method: 'GET',
        params: id
    })
}
// 修改数据
export const reqSpecsDit = (data) => {
    return axios({
        url: bufUrl + '/api/specsedit',
        method: 'POST',
        data: data
    })
}
// 删除
export const reqSpecsDel = (id) => {
    return axios({
        url: bufUrl + '/api/specsdelete',
        method: 'POST',
        data: id
    })
}

// ----------------------------商品管理------------------------------
// 商品添加
export const reqGoodAdd = (data) => {
    return axios({
        url: bufUrl + '/api/goodsadd',
        method: 'POST',
        data: data
    })
}
