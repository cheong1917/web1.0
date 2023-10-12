<script setup>
const showDrawer = ref(false)
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "45%"
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: "提交"
  },
})

const emit = defineEmits(["submit"])
//打开抽屉弹窗
const open = () => showDrawer.value = true
//关闭抽屉弹窗
const close = () => showDrawer.value = false

const submit = () => emit("submit")

const loading = ref(false)
const showLoading = () => loading.value = true
const offLoading = () => loading.value = false

//向父组件暴露方式.//组件通过此方法暴露
defineExpose({
  open,
  close,
  showLoading,
  offLoading

})


</script>

<template>
  <el-drawer
      v-model="showDrawer"
      :title=title
      :size=size
      :close-on-click-modal="false"
      :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="DrawerBody">
        <slot></slot>
      </div>
      <div class="DBtn">
        <el-button type="primary" @click="submit" :loading="loading">{{ props.confirmText }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.formDrawer .DrawerBody {
  flex: 1;
  @apply absolute inset-x-0 top-0 bottom-[50px];
  overflow-y: auto;
}

.formDrawer .DBtn {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>