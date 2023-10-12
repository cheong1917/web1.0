<script setup>
import {useRouter, useRoute} from "vue-router";
import {useUserinfo} from "@/store/userinfo.js";
const router = useRouter()
const route = useRoute()
const store = useUserinfo()
const asideMenus = computed(()=>store.menus)

//拿取路由路径
const DefaultActive = ref(route.path)


const handelSelect = (e) => {
  router.push(e)
}

//折叠计算方法
const isCollapse = computed(() => !(store.asideWidth === '250px'))

</script>

<template>

  <div class="f-menu" :style="{width:store.asideWidth}">
    <el-menu
        :default-active="DefaultActive"
        class="border-0"
        :collapse="isCollapse"
        :collapse-transition="false"
        @select="handelSelect"
    >
      <template v-for="(item,index) in asideMenus" :key="index">
        <!-- 二级菜单 -->
        <el-sub-menu
            v-if="item.child && item.child.length>0"
            :index="item.name"
        >
          <template #title>
            <el-icon :size="20">
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item
              v-for="(item2,index2) in item.child"
              :key="index2"
              :index="item2.frontpath"
          >
            <el-icon :size="20">
              <component :is="item2.icon"></component>
            </el-icon>
            {{ item2.name }}
          </el-menu-item>
        </el-sub-menu>

        <!--一级级菜单 -->
        <el-menu-item v-else :index="item.frontpath">
          <el-icon :size="20">
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.f-menu {
  overflow: auto;
  @apply shadow-md fixed top-[64px] left-0 bottom-0 bg-light-50;
}
.f-menu::-webkit-scrollbar{
  width: 0;
}
</style>