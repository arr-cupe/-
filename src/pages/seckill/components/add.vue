<template>
  <div>
    <el-dialog :visible.sync="info.isShow" :title="info.title">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 时间 -->
        <el-form-item label="活动期限" :label-width="width">
          <el-date-picker
            v-model="value"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="width">
          <el-select label="--请选择--" v-model="form.first_cateid" @change="changList()">
            <el-option label="-----请选择-----" :value="0"></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
            <!-- 动态添加 -->
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select label="--请选择--" v-model="form.second_cateid">
            <el-option label="-----请选择-----" :value="0"></el-option>
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>

            <!-- 动态添加 -->
          </el-select>
        </el-form-item>
        <el-form-item label="规格编号" :label-width="width">
          <el-select label="--请选择--" v-model="form.goodsid">
            <el-option label="------请选择------" :value="0"></el-option>
            <el-option
              v-for="item in goodslist"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
            <!-- 动态添加 -->
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
        <el-button type="primary" @click="add" v-if="info.isAdd == true">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqseckadd, reqsecklistone, reqseckdit } from "../../../util/request";
export default {
  components: {},
  computed: {
    ...mapGetters({
      catelist: "classify/list",
      goodslist: "goods/list",
    }),
  },
  props: ["info"],
  data() {
    return {
      width: "160px",
      secondList: [],
      value: [],
      form: {
        tile: "",
        begintime: "",
        endtime: "",
        first_cateid: 0,
        second_cateid: 0,
        goodsid: 0,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestCate: "classify/requestCate",
      reqchangeList: "goods/reqchangeList",
      reqchangeCont: "goods/reqchangeCont",
      reqchangelists: "seckill/reqchangelist",
    }),
    empty() {
      this.form = {
        tile: "",
        begintime: "",
        endtime: "",
        first_cateid: 0,
        second_cateid: 0,
        goodsid: 0,
        status: 1,
      };
      this.value = [];
    },
    hide() {
      this.info.isShow = false;
    },
    look(id) {
      reqsecklistone({ id: id }).then((res) => {
        this.form = res.data.list;
        if (this.value.length == 0) {
          this.value.push(res.data.list.begintime);
          this.value.push(res.data.list.endtime);
        }
        this.form.id = id;
      });
    },
    add() {
      this.form.begintime = this.value[0];
      this.form.endtime = this.value[1];
      reqseckadd(this.form).then((res) => {
        this.hide();
        this.reqchangelists();
      });
    },
    update() {
      reqseckdit(this.form).then((res) => {
        this.form.begintime = this.value[0];
        this.form.endtime = this.value[1];
        this.hide();
        this.reqchangelists();
      });
    },
    changList() {
      this.secondList = this.catelist.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },
  },
  mounted() {
    this.requestCate();
    this.reqchangeCont();
    this.reqchangeList();
  },
};
</script>
<style></style>
