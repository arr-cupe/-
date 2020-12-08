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
        label="用户编号"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" align="center">
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status == 1">启用</el-button>
          <el-button size="mini" type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="chang(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align='right'
      :page-size="2"
      :pager-count="11"
      layout="prev, pager, next"
      :total="total"
      @current-change='changeCur'
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqGanterListDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "user/list",
      total:'user/total'
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestuserlist: "user/requestuserlist",
      reqchangeCont:'user/reqchangeCont',
      changedits:'user/changedits'
    }),
    chang(uid) {
      console.log(uid);
      this.$emit("etil", uid);
    },
    del(id) {
      reqGanterListDel({ uid: id }).then((res) => {
        alert("删除成功!");
        this.requestuserlist();
        this.reqchangeCont();
        this.changedits(1);
        this.$router.go(0);
      });
    },
    changeCur(a){
      console.log(a);
      this.changedits(a);
    }
  },
  mounted() {
    this.requestuserlist();
    this.reqchangeCont()
  },
};
</script>
<style scope>
.box {
  margin-top: 15px;
}
</style>