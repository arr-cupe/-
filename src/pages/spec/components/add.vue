<template>
  <div>
    <el-dialog :visible.sync="info.isShow" :title="info.title">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="width">
          <el-input
            v-model="attres"
            autocomplete="off"
            style="width: 373px"
          ></el-input>
          <el-button type="primary" @click="changeadd">新增规格属性</el-button>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="width">
          <el-input
            v-model="attres1"
            autocomplete="off"
            style="width: 428px"
            disabled
          ></el-input>
          <el-button type="danger" @click="remove">删除</el-button>
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
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqSpecsAdd,
  reqSpecsListOne,
  reqSpecsDit,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "spec/list",
    }),
  },
  components: {},
  props: ["info"],
  data() {
    return {
      width: "130px",
      attres: "",
      attres1: "",
      form: {
        specsname: "",
        attrs: [],
        status: 1,
      },
    };
  },
  computed: {},

  methods: {
    ...mapActions({
      reqchangeList: "spec/reqchangeList",
      reqchangeCont: "spec/reqchangeCont",
    }),
    empty() {
      this.form = {
        specsname: "",
        attrs: [],
        status: 1,
      };
      this.attres1 = "";
    },
    hide() {
      this.info.isShow = false;
    },
    changeadd() {
      console.log(Object.prototype.toString.call(this.form.attrs));
      if (
        this.attres1 != "" &&
        Object.prototype.toString.call(this.form.attrs).indexOf("Array") == -1
      ) {
        this.form.attrs = JSON.parse(this.form.attrs);
      }
      console.log(this.form.attrs);
      this.form.attrs.push(this.attres);
      this.attres1 = JSON.stringify(this.form.attrs);
      this.attres1 = this.attres1.replace("[", "").replace("]", "");
      this.attres = "";
    },
    remove() {
      console.log(Object.prototype.toString.call(this.form.attrs));
      if (Object.prototype.toString.call(this.form.attrs).indexOf('Array') == -1) {
        this.form.attrs = JSON.parse(this.form.attrs);
      }
      console.log(this.attres1.charAt(this.attres1.lastIndexOf(',')));
      this.attres1 = this.attres1.replace(this.attres1.charAt(this.attres1.lastIndexOf(','))+JSON.stringify(this.form.attrs.pop()),'');
      console.log(this.form.attrs);
    },
    look(id) {
      reqSpecsListOne({ id: id }).then((res) => {
        this.form = res.data.list[0];
        console.log(this.form.attrs);
        this.form.attrs = JSON.parse(this.form.attrs);
        console.log(this.form);
        this.form.attrs = JSON.stringify(this.form.attrs);
        this.attres1 = "";
        for (let i = 0; i < this.form.attrs.length; i++) {
          this.attres1 += this.form.attrs[i].replace("[", "").replace("]", "");
        }
        this.form.id = id;
      });
    },
    add() {
      // 发送请求
      this.form.attrs = JSON.stringify(this.form.attrs);
      console.log(this.form.attrs);
      reqSpecsAdd(this.form).then((res) => {
        console.log(res);
        this.hide();
        this.reqchangeList();
        this.reqchangeCont();
      });
    },
    update() {
      console.log(Object.prototype.toString.call(this.form.attrs));
      if (
        Object.prototype.toString.call(this.form.attrs).indexOf("Array") != -1
      ) {
        this.form.attrs = JSON.stringify(this.form.attrs);
      }
      reqSpecsDit(this.form).then((res) => {
        this.hide();
        this.reqchangeList();
      });
    },
  },
  mounted() {},
};
</script>
<style>
</style>