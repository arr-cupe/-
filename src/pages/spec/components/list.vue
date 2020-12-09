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
        label="规格编号"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="specsname"
        label="规格名称"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column label="规格属性" align="center">
        <!-- <button>{{item}}</button> -->
        <!-- prop='attrs' -->
        <template slot-scope="scope">
          <span v-for="item in scope.row.attrs" :key="item" class="myspan">
            {{
              item
                .replace("[", "")
                .replace("]", "")
                .replace('"', "")
                .replace('"', "")
                .replace('"', "")
            }}
          </span>
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
          <el-button type="primary" @click="chang(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <!-- 分页 -->
      <!-- <el-pagination
      align='right'
      :page-size="2"
      layout="prev, pager, next"
      :total="total"
      @current-change='changeCur'
    >
    </el-pagination> -->
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="2"
      @current-change="changeCur"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqSpecsDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "spec/list",
      total: "spec/total",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqchangeList: "spec/reqchangeList",
      reqchangeCont: "spec/reqchangeCont",
      reqchangecur: "spec/reqchangecur",
    }),

    del(id) {
      reqSpecsDel({ id: id }).then((res) => {
        this.reqchangeList();
         this.reqchangecur(1)
      });
    },
    chang(id) {
      this.$emit("etil", id);
    },
    changeCur(a) {
      console.log(a);
      this.reqchangecur(a);
    },
  },
  mounted() {
    this.reqchangeList();
    this.reqchangeCont();
  },
};
</script>
<style scope>
.box {
  margin-top: 15px;
}
.myspan {
  display: inline-block;
  height: 22px;
  background-color: rgba(0, 128, 128, 0.486);
  margin-left: 3px;
  border-radius: 3px;
}
</style>