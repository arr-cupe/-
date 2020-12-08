<template>
  <div>
    <el-dialog :visible.sync="info.isShow" :title="info.title">
      <el-form :model="form">
        <el-form-item label="上级菜单" :label-width="width">
          <el-select label="--请选择--" v-model="form.pid" @change="chang()">
            <el-option label="顶级分类" :value="1"></el-option>
            <!-- 动态添加 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传 -->
        <el-form-item label="图片" :label-width="width" v-if="form.pid!=1">
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
        pid: "请选择",
        catename: "",
        img: null,
        status: 1,
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
    empty() {
      this.form = {
        pid: "请选择",
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    hide() {
      this.info.isShow = false;
    },
    look(e) {
      reqCateListOne({ id: e.id }).then((res) => {
        this.form = res.data.list;
        this.imageUrl = `/api${e.img}`;
        this.form.id = e.id;
        console.log(res);
      });
    },
    add() {
      // 发送请求
      reqCateAdd(this.form).then((res) => {
        this.requestCate(this.list.pid);
        this.hide();
      });
    },
    update() {
      console.log(1);
      reqCateDit(this.form).then((res) => {
        console.log(res, 123213);
        this.hide();
        this.requestCate(this.list.pid);
      });
    },
    chang() {},
    mounted() {
      this.requestCate(this.list.pid);
    },
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