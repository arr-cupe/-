<template>
 <div>
     <el-button type='primary' @click="changeAdd">添加</el-button>
     <v-add :info='info'></v-add>
     <v-list></v-list>
 </div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
components:{vAdd,vList},
data(){
    return {
        info:{
            isShow:false,
            isAdd:true,
            title:'商品添加'
        }
    }
},
methods:{
    changeAdd(){
        this.info.isShow = !this.info.isShow;
        this.info.isAdd = true;
        this.info.title = '商品添加'
    }
}
};
</script>
<style>
</style>