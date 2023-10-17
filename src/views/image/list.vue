<script setup>
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";

const windowsHeight = window.innerHeight || document.body.clientHeight
const h = windowsHeight - 64 - 44 - 40
</script>

<template>
  <el-container class="bg-white rounded" :style="{height:(h+'px')}">
    <el-header class="image-header">Header</el-header>
    <el-container>
      <ImageAside />
      <ImageMain />
    </el-container>
  </el-container>
</template>

<style scoped>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>