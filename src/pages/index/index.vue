<template>
  <div>
    <el-container>
      <el-aside width="199px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/index/home" width="203px">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>

          <div v-for="item in list.menus" :key="item.id" style="line-height:30px">
            <el-submenu :index="item.title" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="'/index' + i.url"
                  v-for="i in item.children"
                  :key="i.id"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="'/index' + item.url" v-else>{{
              item.title
            }}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header
          ><div class="headerTop">
            <span>{{ list.username }}</span
            ><span
              ><el-button type="danger" @click="danger">退出</el-button></span
            >
          </div></el-header
        >
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "login/list",
    }),
  },
  components: {},
  methods: {
    ...mapActions({
      requestRoleList: "login/requestRoleList",
    }),
    danger() {
      this.$router.push("/login");
      this.requestRoleList({});
    },
  },
};
</script>
<style scope>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  width: 199px;
  color: #333;
  text-align: center;
  line-height: 100px;
  min-height: 100vh;
  overflow-y: hidden;
  background-color: #20222a;
  min-width: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-menu-item-group {
  overflow: hidden;
}
.el-menu {
  border: none;
}
.headerTop {
  float: right;
}
</style>