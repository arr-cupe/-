<template>
  <div>
    <el-button type="primary" @click="show">添加</el-button>
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
        title: "规格添加",
      },
    };
  },
  methods: {
    show() {
      this.info.isShow = !this.info.isShow;
      this.info.isAdd = true;
      this.info.title = '规格添加'
      this.$refs.one.empty();
    },
    etil(e) {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.info.title = '规格修改'
      this.$refs.one.look(e);
    },
  },
};
</script>
<style scope>
.el-button {
  margin-top: 15px;
}
</style>