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
      <el-table-column prop="title" label="活动名称" sortable width="180" align="center">
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
import {mapActions,mapGetters} from 'vuex';
import {reqseckdel} from '../../../util/request'
export default {
  components: {},
  computed:{
    ...mapGetters({
      list:'seckill/list'
    })
  },
  methods:{
    ...mapActions({
      reqchangelist:'seckill/reqchangelist'
    }),
    chang(id){
      this.$emit('emit',id);
    },
    del(id){
      reqseckdel({id:id}).then(res=>{
        alert('删除成功');
        this.reqchangelist();
      })
    }
  },
  mounted(){
    this.reqchangelist();
  }
};
</script>
<style scope>
.box{
  margin-top: 15px;
}
</style>
