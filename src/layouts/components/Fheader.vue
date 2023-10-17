<script setup>
import {useUserinfo} from "@/store/userinfo.js";
import {useFullscreen} from '@vueuse/core'
import FormDrawer from "@/components/FormDrawer.vue";
import {useRePassword, useLogOut} from "@/composables/useManager.js";
import {useRouter} from "vue-router";

const router = useRouter()
const {
  isFullscreen,
  toggle
} = useFullscreen()

const {
  ruleFormRef,
  form,
  formDrawerRef,
  rules,
  onSubmit,
  openRePasswordForm
} = useRePassword()

const {
  handelLogout
} = useLogOut()

const store = useUserinfo()

const CONTENT = computed(() => store.asideWidth === "250px" ? "折叠菜单" : "展开菜单")

//el-item节点选择
const handelCommand = (c) => {
  switch (c) {
    case "logout":
      handelLogout()
      break;
    case "EditPassword":
      openRePasswordForm()
      break;
    default:
      break;
  }
}

//刷新按钮
const handelRefresh = () => {
  //原生js .reload方法刷新网页
  location.reload()
}


</script>

<template>
  <div class="f-header">
    <!-- left   -->
    <span class="logo">
      <el-icon class="mr-0.5"><SwitchFilled/></el-icon>
      TestDemo
    </span>
    <el-tooltip
        class="box-item"
        effect="dark"
        :content="CONTENT"
        placement="bottom"
    >
      <el-icon class="LIcon-btn" @click="store.handelAsideWidth()">
        <ArrowLeftBold v-if="store.asideWidth==='250px'"/>
        <ArrowRightBold v-else/>
      </el-icon>
    </el-tooltip>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="刷新"
        placement="bottom"
    >
      <el-icon class="LIcon-btn" @click="handelRefresh">
        <Refresh/>
      </el-icon>
    </el-tooltip>

    <!-- right   -->
    <div class="ml-auto flex items-center">

      <el-tooltip
          class="box-item"
          effect="dark"
          content="全屏"
          placement="bottom"
      >
        <el-icon class="LIcon-btn mr-5" @click="toggle">
          <FullScreen v-if="!isFullscreen"/>
          <Aim v-else/>
        </el-icon>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handelCommand">
        <span class="flex items-center text-light-200">
          <el-avatar class="mr-2" :size="50" :src="store.user.avatar"/>
         {{ store.user.username }}
      <el-icon class="el-icon--right mx-2">
        <arrow-down/>
      </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>个人中心</el-dropdown-item>
            <el-dropdown-item command="EditPassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>


  <FormDrawer
      ref="formDrawerRef"
      title="修改密码"
      destroyOnClose
      @submit="onSubmit"
  >
    <!--  表单  -->
    <el-form
        :model="form"
        :rules="rules"
        ref="ruleFormRef"
        label-width="80px"
        size="small"
    >
      <el-form-item prop="oldPassword" label="旧密码:">
        <el-input v-model="form.oldPassword" clearable placeholder="请输入旧密码">
        </el-input>
      </el-form-item>

      <el-form-item prop="newPassword" label="新密码:">
        <el-input v-model="form.newPassword" type="password" clearable show-password placeholder="请输入新密码">
        </el-input>
      </el-form-item>

      <el-form-item prop="rePassword" label="确认密码:">
        <el-input v-model="form.rePassword" clearable placeholder="确认新密码">
        </el-input>
      </el-form-item>
    </el-form>

  </FormDrawer>
</template>

<style scoped>
.f-header {
  @apply flex items-center text-light-50 fixed top-0 left-0 right-0;
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
  height: 64px;
  z-index: 1000;
}

.logo {
  @apply flex items-center justify-center text-xl;
  width: 250px;
}

.LIcon-btn {
  @apply flex items-center justify-center;
  width: 52px;
  height: 64px;
  cursor: pointer;
}

.LIcon-btn:hover {
  @apply text-black;
}
.LIcon-btn:active{
  @apply bg-cyan-100
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex items-center justify-center;
}

.dropdown :focus {
  outline: none;
}

</style>