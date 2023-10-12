<script setup>
import {getStatistics3} from "@/api/index.js";
import {useResizeObserver} from '@vueuse/core'
import * as echarts from 'echarts/core';
import {GridComponent} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

const current = ref("week")
const options = [
  {
    text: "近1个月",
    value: "month"
  },
  {
    text: "近1周",
    value: "week"
  },
  {
    text: "近24小时",
    value: "hour"
  }
]

function handleChoose(type) {
  current.value = type
  getData()
}

let myChart = null
onMounted(() => {
  let chartDom = document.getElementById('chart');
  myChart = echarts.init(chartDom);
  getData()
})

function getData() {
  let option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  myChart.showLoading();
  getStatistics3(current.value).then(res => {
    option.xAxis.data = res.x
    option.series[0].data = res.y
    myChart.setOption(option)
  }).finally(() => {
    myChart.hideLoading();
  })

}

onBeforeUnmount(() => {
  if (myChart) {
    echarts.dispose(myChart)
  }
})

const el = ref(null)
useResizeObserver(el, () => {
  myChart.resize()
})

</script>

<template>
  <el-card shadow="never" class="mt-5">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">统计</span>
        <div>
          <el-check-tag
              v-for="(item,index) in options" :key="index"
              :checked="current===item.value"
              style="margin-right: 8px"
              @click="handleChoose(item.value)"
          >
            {{ item.text }}
          </el-check-tag>
        </div>
      </div>
    </template>

    <div id="chart" style="width: 100%;height: 300px" ref="el">

    </div>

  </el-card>
</template>

<style scoped>

</style>