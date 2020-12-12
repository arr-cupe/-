<template>
 <div>
     <el-button type="primary" @click="change">添加</el-button>
     <v-add :info='info' ref="one"></v-add>
     <v-list @emit='emit($event)'></v-list>
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
            title:'轮播图添加'
        }
    }
},
methods:{
    change(){
        this.info.isShow = !this.info.isShow;
        this.info.isAdd = true;
        this.info.title = '轮播图添加';
        this.$refs.one.empty();
    },
    emit(e){
        // console.log(e);
        this.info.isShow = true;
        this.info.isAdd = false;
        this.info.title = '轮播图修改';
        this.$refs.one.look(e);
    }
}
};
</script>
<style>
.el-button{
    margin-top: 15px;
}
</style>