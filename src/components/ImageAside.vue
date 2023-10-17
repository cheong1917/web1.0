<script setup>

</script>

<template>
    <el-aside width="220px" class="image-aside">
      <div class="topA">
        <div class="asideList">
          <span class="truncate">标题111111111111111111</span>
          <el-button text type="primary" size="small" class="ml-a px-0">
            <el-icon :size="12">
              <Edit />
            </el-icon>
          </el-button>
          <el-button text type="primary" size="small" class="px-0">
            <el-icon :size="12">
              <Close />
            </el-icon>
          </el-button>
        </div>

        <div class="asideList active">
          <span class="truncate">标题2</span>
          <el-button text type="primary" size="small" class="ml-a px-0">
            <el-icon :size="12">
              <Edit />
            </el-icon>
          </el-button>
          <el-button text type="primary" size="small" class="px-0">
            <el-icon :size="12">
              <Close />
            </el-icon>
          </el-button>
        </div>
      </div>
      <div class="bottomA">
        分页
      </div>
    </el-aside>
</template>

<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  @apply relative;
}
.image-aside .topA{
  @apply absolute top-0 bottom-50px inset-x-0 overflow-y-auto;
}

.image-aside .bottomA{
  border-top: 1px solid #eeeeee;
  position: absolute;
  bottom: 0;
  height: 50px;
  @apply flex items-center justify-center inset-x-0;
}
.asideList{
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;

}
.asideList:hover,.active{
  background-color: #eeeeee;
}
</style>