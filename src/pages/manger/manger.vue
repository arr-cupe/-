<template>
  <div>
    <el-button type="primary" @click="change">添加</el-button>
    <v-add :info="info" ref="one"></v-add>
    <v-list @etil="etil($event)" :info="info"></v-list>
    
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { vAdd, vList },
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true,
        title: "用户添加",
      },
      
    };
  },
  methods: {
    change() {
      this.info.isShow = !this.info.isShow;
      this.info.isAdd = true;
      this.info.title = "用户添加";
      this.$refs.one.empty();
    },
    etil(e) {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.info.title = "修改用户";
      this.$refs.one.look(e);
    }
  },
  mounted() {
    
  },
};
</script>
<style scope>
.el-button {
  margin-top: 15px;
}
</style>