<script setup>

</script>

<template>
  <el-main class="image-main">
    <div class="topA flex items-center justify-center text-3xl">
      内容
    </div>
    <div class="bottomA">
      分页
    </div>
  </el-main>
</template>

<style scoped>
.image-main {
  @apply relative;
}
.image-main .topA {
   @apply absolute top-0 bottom-50px inset-x-0 overflow-y-auto;
 }
.image-main .bottomA {
  border-top: 1px solid #eeeeee;
  position: absolute;
  bottom: 0;
  height: 50px;
  @apply flex items-center justify-center inset-x-0;
}
</style>