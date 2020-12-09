<template>
  <div>
    <el-dialog :visible.sync="info.isShow" :title="info.title" @opened="changeEditor">
      <el-form :model="form">
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
        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传 -->
        <el-form-item label="图片" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="规格编号" :label-width="width">
          <el-select label="--请选择--" v-model="form.specsid" @change="changeSpec()">
            <el-option label="------请选择------" :value="0"></el-option>
            <el-option
              v-for="item in speclist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
            <!-- 动态添加 -->
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="width">
          <el-select label="--请选择--" v-model="form.specsattr" multiple>
            <el-option
              v-for="item in secondSpec"
              :key="item"
              :value="item.replace('[', '').replace(']', '')"
              >{{
                item.replace("[", "").replace("]", "").replace('"', "").replace('"', "")
              }}</el-option
            >
            <!-- 动态添加 -->
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述" :label-width="width">
          <!-- <el-input type="textarea" v-model="form.description"></el-input> -->
          <div id="div1" v-if="info.isShow"></div>
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
import { reqGoodAdd, reqgoodListOne, reqgoodListDit } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import E from "wangeditor";
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      width: "160px",
      imageUrl: "",
      secondList: [], //用来存放二级类别
      secondSpec: [], //用来存放规格属性
      form: {
        first_cateid: 0, //一级分类编号
        second_cateid: 0, //二级分类编号
        goodsname: "", //商品名称
        price: 0, //商品价格
        market_price: 0, //市场价格
        img: null, //商品图片
        description: "", //商品描述
        specsid: 0, //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1, //是否新品     1-是 2-否
        ishot: 1, //是否热卖推荐 1-是 2-否
        status: 1, //状态1正常2禁用
      },
    };
  },
  computed: {
    ...mapGetters({
      catelist: "classify/list",
      speclist: "spec/list",
    }),
  },
  methods: {
    ...mapActions({
      requestCate: "classify/requestCate",
      reqchangeLists: "spec/reqchangeList",
      reqchangeList: "goods/reqchangeList",
      reqchangecur: "spec/reqchangecur",
      reqchangeCont: "goods/reqchangeCont",
    }),
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      this.form.img = file;
    },
    empty() {
      this.secondList = []; //用来存放二级类别
      this.secondSpec = []; //用来存放规格属性
      this.form = {
        first_cateid: 0, //一级分类编号
        second_cateid: 0, //二级分类编号
        goodsname: "", //商品名称
        price: 0, //商品价格
        market_price: 0, //市场价格
        img: null, //商品图片
        description: "", //商品描述
        specsid: 0, //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1, //是否新品     1-是 2-否
        ishot: 1, //是否热卖推荐 1-是 2-否
        status: 1, //状态1正常2禁用
      };
      this.imageUrl = "";
    },
    // 打开弹窗创建富文本编辑器
    changeEditor() {
      this.editor = new E("#div1");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    hide() {
      this.info.isShow = false;
    },
    look(e) {
      reqgoodListOne({ id: e }).then((res) => {
        this.form = res.data.list;
        this.imageUrl = "/api" + res.data.list.img;
        this.form.specsattr = res.data.list.specsattr.split(",");
        this.form.id = e;
        // this.reqchangeList();
        // 这里由于一部操作的原因不能够一点编辑就可以拿到 而且有可能会报错
        // this.editor.txt.html(this.form.description)
      });
    },
    add() {
      // 获取富文本的内容
      this.form.description = this.editor.txt.html();
      // 发送请求
      reqGoodAdd(this.form).then((res) => {
        this.hide();
        this.reqchangeCont();
        this.reqchangeList();
      });
    },
    update() {
      reqgoodListDit(this.form).then((res) => {
        this.hide();
        this.reqchangeList();
      });
    },
    changList() {
      this.secondList = this.catelist.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },
    changeSpec() {
      console.log(1);
      this.form.specsattr = [];
      this.secondSpec = this.speclist.find((item) => {
        return item.id == this.form.specsid;
      }).attrs;
    },
  },
  mounted() {
    this.requestCate();
    this.reqchangeLists();
    this.reqchangeList();
    this.reqchangecur();
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
