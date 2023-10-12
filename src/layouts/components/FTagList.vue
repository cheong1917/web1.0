<script setup>
import {useTagList} from "@/composables/usetagList.js";
import {useUserinfo} from "@/store/userinfo.js";

const store = useUserinfo()
const {
  activeTab,
  tabList,
  changTabs,
  removeTab,
  handleCommand
} = useTagList()
</script>

<template>
  <div class="f-tap-list" :style="{left:store.asideWidth}">
    <el-tabs
        v-model="activeTab"
        type="card"
        class="demo-tabs"
        @tab-remove="removeTab"
        @tab-change="changTabs"
        style="min-width: 100px"
    >
      <el-tab-pane
          v-for="item in tabList"
          :closable="item.path!=='/'"
          :key="item.path"
          :label="item.title"
          :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down/>
          </el-icon>
         </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </template>
      </el-dropdown>
    </span>
  </div>
  <!--  占位div-->
  <div style="height: 44px"></div>
</template>
<style scoped>
.f-tap-list {
  @apply fixed bg-gray-100 flex items-center px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
}

.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-2;
  height: 32px;
}

.tag-btn :focus {
  outline: none;
}

:deep(.el-tabs__header) {
  border: 0 !important;
  @apply mb-0;
}

:deep(.el-tabs__nav) {
  border: 0 !important;
}

:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  @apply bg-white mx-1 mt-0.5 rounded;
}

:deep(.el-tabs__nav-next) {
  height: 32px;
}

:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>