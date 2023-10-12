<script setup>
import {getStatistics1} from "@/api/index.js";
import CountTo from "@/components/CountTo.vue";
import IndexNavs from "@/components/indexNavs.vue";
import IndexChart from "@/components/indexChart.vue";
import {useUserinfo} from "@/store/userinfo.js";
const store = useUserinfo()
const panels = ref([])
getStatistics1().then(res => {
  panels.value = res.panels
})

</script>

<template>
  <div style="">
    <el-row :gutter="20">
      <!--  骨架屏/加载     -->
      <template v-if="panels.length===0">
        <el-col :span="6" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <!--header  -->
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 45%"/>
                    <el-skeleton-item variant="text" style="width: 20%"/>
                  </div>
                </template>
                <!--body  -->
                <el-skeleton-item variant="h3" style="width: 80%"/>
                <!--element库线条标签   -->
                <el-divider/>
                <!--footer     -->
                <div class="flex justify-between">
                  <el-skeleton-item variant="text" style="width: 45%"/>
                  <el-skeleton-item variant="text" style="width: 20%"/>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <!--  主体数据    -->
      <el-col :span="6" :offset="0" v-for="(item,index) in panels" :key="index">
        <el-card shadow="hover" class="border-0">
          <!--header  -->
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag
                  class=""
                  :type="item.unitColor"
                  effect="plain"
              >
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <!--body  -->
          <span class="text-3xl font-bold text-gray-500">
            <CountTo :value="item.value"/>
          </span>
          <!--element库线条标签   -->
          <el-divider/>
          <!--footer     -->
          <div class="flex justify-between">
            <span>
              {{ item.subTitle }}
            </span>
            <span>
              {{ item.subValue }}
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--    第二行小图标-->
    <IndexNavs/>

    <!--    图表-->
    <el-row :gutter="20">
      <el-col :span="12">
        <index-chart/>
      </el-col>
      <el-col :span="12">

      </el-col>
    </el-row>


  </div>
</template>

<style scoped>

</style>