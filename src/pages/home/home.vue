<template>
  <div>
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  methods: {
    ...mapActions({
      requestCate: "classify/requestCate",
    }),
  },
  watch: {
    list: {
      handler() {
        var myChart = echarts.init(document.getElementById("main"));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          legend: {
            data: ["销量"],
          },
          xAxis: {
            data: this.list.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "line",
              data: this.list.map((item) =>
                item.children ? item.children.length : 0
              ),
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep: true,
    },
  },
  mounted() {
    this.requestCate(this.list.pid);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: this.list.map((item) => item.catename),
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: this.list.map((item) =>
            item.children ? item.children.length : 0
          ),
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
// }
// }
</script>
<style>
</style>