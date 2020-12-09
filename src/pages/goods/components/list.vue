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
      <el-table-column prop="id" label="商品编号" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column label="图片" align="center" width="140">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <p v-if="scope.row.pid != 1">
            <img
              :src="'http://localhost:3000' + scope.row.img"
              alt=""
              width="100%"
              height="200px"
            />
          </p>
          <p v-else>null</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否新品" width="101">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.isnew == 1">是</el-button>
          <el-button size="mini" type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否热卖" width="101">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.ishot == 1">是</el-button>
          <el-button size="mini" type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="101">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status == 1">启用</el-button>
          <el-button size="mini" type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="201">
        <template slot-scope="scope">
          <el-button type="primary" @click="chang(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="2"
      layout="prev, pager, next"
      :total="total"
      align="right"
      @current-change="curchange"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqgoodListDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqchangeList: "goods/reqchangeList",
      reqchangeCont: "goods/reqchangeCont",
      reqPage: "goods/reqPage",
    }),

    chang(id) {
      this.$emit("emit", id);
    },
    del(id) {
      reqgoodListDel({ id: id }).then((res) => {
        alert("删除成功");
        this.reqchangeList();
        this.reqchangeCont();
        this.reqPage(1);
      });
    },
    curchange(a) {
      this.reqPage(a);
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
img {
  width: 100px;
  height: 100px;
}
</style>