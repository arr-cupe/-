<template>
 <div>
     <el-button type="primary" @click="change">添加</el-button>
     <v-add :info='info' ref="one"></v-add>
     <v-list @etil='etil($event)'></v-list>
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
            title:'菜单添加'
        }
    }
},
methods:{
    // 添加
    change(){
        this.info.isShow = !this.info.isShow;
        this.info.isAdd = true;
        this.info.title='菜单添加';
        this.$refs.one.empty()
    },
    // 编辑
    etil(e){
        this.info.isShow =true;
        this.info.isAdd=false;
        this.info.title='菜单修改';
        this.$refs.one.look(e.id)
        // this.$refs.one.adds(e)
    }
},
// mounted(){

// }
};
</script>
<style>
.el-button{
    margin-top: 15px;
}
</style>