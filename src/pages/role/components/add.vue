<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqRoleAdd,
  reqRoleListOne,
  reqRoleListDit,
} from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "menuList/list",
    }),
  },
  components: {},
  props: ["info"],
  data() {
    return {
      width: "160px",
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    ...mapActions({
      requestMeunList: "menuList/requestMeunList",
      requestRoleList: "role/requestRoleList",
    }),
    empty(){
      this.form={
        rolename: "",
        menus: [],
        status: 1,
      };
      if(this.form.menus!=''){this.form.menus = this.$refs.tree.setCheckedKeys([]);}
      
    },
    hide() {
      this.info.isShow = false;
    },
    // 添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        console.log(res);
        this.hide();
        this.requestRoleList();
      });
    },
    // 获取一条数据 将数据渲染到编辑弹出来的框
    look(id) {
      reqRoleListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.menus = this.$refs.tree.setCheckedKeys(
          JSON.parse(res.data.list.menus)
        );
        this.form.id = id;
      });
    },
    // 编辑
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleListDit(this.form).then((res) => {
        this.requestRoleList();
        this.hide();
      });
      // this.empty();
    },
  },
  mounted() {
    this.requestMeunList();
  },
};
</script>
<style>
</style>