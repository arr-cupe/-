<template>
  <div>
    <el-dialog :visible.sync="info.isShow" :title="info.title">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            placeholder="--请选择--"
            v-model="form.pid"
            @change="chang()"
          >
            <el-option label="顶级菜单" :value="1"></el-option>
            <!-- 动态添加 -->
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              @change="chang"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 单选框 -->
        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option label="星星" value="el-icon-star-on"
              ><i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="小飞机" value="el-icon-s-promotion"
              ><i class="el-icon-s-promotion"></i>
            </el-option>
            <el-option label="小人人" value="el-icon-s-custom"
              ><i class="el-icon-s-custom"></i>
            </el-option>
            <el-option label="小灯泡" value="el-icon-s-opportunity"
              ><i class="el-icon-s-opportunity"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRouters"
              :label="item.name"
              :key="item.path"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
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
        <el-button type="primary" @click="add" v-if="info.isAdd == true"
          >添 加</el-button
        >
        <el-button type="primary" @click="adds" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index";
import {
  reqMenuAdd,
  reqMenuListOne,
  reqMenuListDit,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      menuList: "menuList/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "130px",
      form: {
        title: "",
        pid: 1,
        type: 1,
        url: "",
        icon: "",
        status: 1,
      },
      indexRouters: indexRouters,
      id: {},
    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      requestMeunList: "menuList/requestMeunList",
    }),
    empty() {
      this.form = {
        title: "",
        pid: 1,
        type: 1,
        url: "",
        icon: "",
        status: 1,
      };
    },
    hide() {
      this.info.isShow = false;
      // this.empty();
    },
    add() {
      reqMenuAdd(this.form).then((res) => {
        this.hide();
        this.requestMeunList();
      });
    },
    chang() {
      this.form.pid == 1 ? (this.form.type = 1) : (this.form.type = 2);
    },
    look(e) {
      reqMenuListOne({ id: e }).then((res) => {
        this.form = res.data.list;
        this.form.id = e;
      });
      // this.empty()
    },
    adds() {
      reqMenuListDit(this.form).then((res) => {
        this.hide();
        this.$router.go(0);
      });
    },
  },
  mounted() {
    // this.reqMenuListOne()
  },
};
</script>
<style>
</style>