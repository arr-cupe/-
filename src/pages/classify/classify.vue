<template>
  <div>
    <el-button type="primary" @click="change">添加</el-button>
    <v-add :info="info" ref="one"></v-add>
    <v-list @emit="emit($event)"></v-list>
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
        title: "商品分类添加",
      },
    };
  },
  methods: {
    //   添加
    change() {
      this.info.isShow = !this.info.isShow;
      this.info.isAdd = true;
      this.info.title = "商品分类添加";
      // console.log(this.$refs.one);
      this.$refs.one.empty();
    },
    // 编辑
    emit(e) {
      console.log(e);
      this.info.isShow = true;
      this.info.isAdd = false;
      this.info.title = "商品分类修改";
      this.$refs.one.look(e);
    },
  },
};
</script>
<style scope>
.el-button{
    margin-top: 15px;
}
</style>