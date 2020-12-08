<template>
  <div class="box">
    <!-- <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column  label="状态"> 
          <el-button type="primary">启用</el-button>
          <el-button type="danger">禁用</el-button>
      </el-table-column>
      <el-table-column  label="操作"> 
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table> -->
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180" align="center">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180" align="center">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" align="center">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" align="center">
      </el-table-column>
      <!-- <el-table-column label="状态">
        <el-button type="primary" >启用</el-button>
        <el-button type="danger">禁用</el-button>
      </el-table-column> -->
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status == 1">启用</el-button>
          <el-button size="mini" type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="chang(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuListDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "menuList/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestMeunList: "menuList/requestMeunList",
    }),
    chang(id) {
      this.$emit("etil", id);
    },
    del(id) {
      reqMenuListDel({ id: id }).then((res) => {
        alert('删除成功')
        this.requestMeunList()
      });
    },
  },
  mounted() {
    this.requestMeunList();
  },
};
</script>
<style scope>
.box {
  margin-top: 20px;
}
</style>