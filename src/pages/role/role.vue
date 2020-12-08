<template>
  <div class="box">
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="one"></v-add>
    <v-list @etil="etil($event)"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: { vAdd, vList },
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true,
        title: "角色添加",
      },
    };
  },
  methods: {
    //添加
    add() {
      this.info.isShow = !this.info.isShow;
      this.info.isAdd = true;
      this.info.title = "角色添加";
      this.$refs.one.empty()
    },
    // 编辑
    etil(e) {
      console.log(e, 123213);
      this.info.isShow = true;
      this.info.isAdd = false;
      this.info.title = "角色修改";
      this.$refs.one.look(e)
      
    },
  },
};
</script>
<style scope>
.box{
    margin-top: 15px;
}
</style>