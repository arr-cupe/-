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
        label="角色编号"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名称"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status == 1">启用</el-button>
          <el-button size="mini" type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="chang(scope.row.id)"
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
import { reqRoleListDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestRoleList",
    }),
    chang(id) {
      console.log(id);
      this.$emit("etil", id);
    },
    del(id) {
        reqRoleListDel({id:id}).then(res=>{
            // console.log(res);
            alert('删除成功');
            this.requestRoleList();
        })
    },
  },
  mounted() {
    this.requestRoleList();
  },
};
</script>
<style scope>
.box{
    margin-top: 20px;
}
</style>