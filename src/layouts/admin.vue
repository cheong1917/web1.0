<script setup>
import FHeader from "@/layouts/components/Fheader.vue";
import FMenu from "@/layouts/components/FMenu.vue";
import FTagList from "@/layouts/components/FTagList.vue";
import {useUserinfo} from "@/store/userinfo.js";
const store = useUserinfo()
</script>

<template>
  <el-container>
    <el-header>
      <f-header></f-header>
    </el-header>
  </el-container>
  <el-container>
    <el-aside :style="{width:store.asideWidth}">
      <f-menu></f-menu>
    </el-aside>
    <el-main>
      <f-tag-list></f-tag-list>
      <router-view v-slot="{Component}">
        <transition name="fade">
          <keep-alive :max="10">
            <Component :is="Component"></Component>
          </keep-alive>
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
  transition: all 0.3s;
}
.fade-enter-active{
  transition-delay: 0.3s;
}
</style>