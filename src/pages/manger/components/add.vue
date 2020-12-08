<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid" placeholder="请选择" >
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqGanterAdd,
  reqGanterListOne,
  reqGanterListDit,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  components: {},
  props: ["info"],
  data() {
    return {
      width: "160px",
      form: {
        roleid: '请选择',
        status: 1,
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestRoleList",
      requestuserlist: "user/requestuserlist",
      reqchangeCont:'user/reqchangeCont'
    }),
    empty() {
      this.form = {
        roleid: '请选择',
        status: 1,
        username: "",
        password: "",
      };
    },
    hide() {
      this.info.isShow = false;
    },
    add() {
      reqGanterAdd(this.form).then((res) => {
        this.hide();
        this.requestuserlist();
        this.reqchangeCont();
      });
    },

    look(uid) {
      reqGanterListOne({ uid: uid }).then((res) => {
        this.form = res.data.list;
        this.form.password = '';
        this.form.uid = uid;
      });
    },
    update() {
      reqGanterListDit(this.form).then((res) => {
        this.hide();
        this.requestuserlist();
        
      });
    },
  },
  mounted() {
    this.requestRoleList();
  },
};
</script>
<style scope>
</style>