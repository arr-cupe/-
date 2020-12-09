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
      <el-table-column prop="id" label="编号" sortable width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="title"
        label="轮播图标题"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <img
            :src="'http://localhost:3000' + scope.row.img"
            alt=""
            width="100%"
            height="200px"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status == 1">启用</el-button>
          <el-button size="mini" type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="chang(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqbannerDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqchangeList: "banner/reqchangeList",
    }),
    chang(id) {
      this.$emit("emit", id);
    },
    del(id) {
      reqbannerDel({id:id}).then((res) => {
        alert("删除成功");
        this.reqchangeList();
      });
    },
  },
  mounted() {
    this.reqchangeList();
  },
};
</script>
<style scope>
.box {
  margin-top: 15px;
}
img {
  width: 100px;
  height: 100px;
}
</style>
