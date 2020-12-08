<template>
  <div class="box">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="id"
        label="分类编号"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="catename"
        label="分类名称"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column  label="图片" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <p v-if="scope.row.pid!=1"><img :src='"http://localhost:3000"+scope.row.img' alt="" width="100%" height="200px"></p>
          <p v-else>null</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status == 1">启用</el-button>
          <el-button size="mini" type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="chang(scope.row.id,scope.row.img)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqCateDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestCate: "classify/requestCate",
    }),

    chang(id,img) {
      // console.log(id);
      // console.log(img);
      let obj = {
        id:id,
        img:img
      }
      this.$emit("emit",obj);
    },
    del(id) {
      reqCateDel({id:id}).then((res) => {
        console.log(res);
        this.requestCate(this.list.pid);
      });
    },
  },
  mounted() {
    this.requestCate(this.list.pid);
  },
};
</script>
<style scope>
.box{
    margin-top: 15px;
}
</style>