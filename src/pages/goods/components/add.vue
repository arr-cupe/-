<template>
  <div>
    <el-dialog :visible.sync="info.isShow" :title="info.title">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select
            label="--请选择--"
            v-model="form.first_cateid"
            @change="chang()"
          >
            <!-- <el-option label="顶级分类" :value="1"></el-option> -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
            <!-- 动态添加 -->
          </el-select>{{form.first_cateid}}
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select
            label="--请选择--"
            v-model="form.second_cateid"
          >
            <el-option
              v-for="item in list.children"
              :key="item.id"
              :label="item.catename"
              :value="item.pid"
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
          <el-select
            label="--请选择--"
            v-model="form.specsid"
          >
            <el-option label="顶级分类" :value="1"></el-option>
            <!-- 动态添加 -->
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="width">
          <el-select
            label="--请选择--"
            v-model="form.specsattr"
          >
            <el-option label="顶级分类" :value="1"></el-option>
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
          <el-input type="textarea" v-model="form.description"></el-input>
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
import { reqCateAdd, reqCateListOne, reqCateDit } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      width: "160px",
      imageUrl: "",
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: null, //商品图片
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品     1-是 2-否
        ishot: 1, //是否热卖推荐 1-是 2-否
        status: 1, //状态1正常2禁用
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  methods: {
    ...mapActions({
      requestCate: "classify/requestCate",
    }),
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      this.form.img = file;
    },
    // empty() {
    //   this.form = {
    //     pid: "请选择",
    //     catename: "",
    //     img: null,
    //     status: 1,
    //   };
    //   this.imageUrl = "";
    // },
    hide() {
      this.info.isShow = false;
    },
    // look(e) {
    //   reqCateListOne({ id: e.id }).then((res) => {
    //     this.form = res.data.list;
    //     this.imageUrl = `/api${e.img}`;
    //     this.form.id = e.id;
    //     console.log(res);
    //   });
    // },
    add() {
      // 发送请求
    },
    update() {},
    chang() {
    },
  },
  mounted() {
    this.requestCate(this.list.pid);
    console.log(this.list.id);
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