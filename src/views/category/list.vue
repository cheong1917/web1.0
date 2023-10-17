<script setup>
const windowsHeight = window.innerHeight || document.body.clientHeight
const h = windowsHeight - 64 - 44 - 40
const loading = true
</script>

<template>
  <div class="flex items-center justify-center" :style="{height:(h+'px')}" v-loading="loading">
    1
  </div>
</template>

<style scoped>

</style>