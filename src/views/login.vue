<script setup>
import {toast} from "@/utils/Putil.js";
import {useRouter} from "vue-router";
import {useUserinfo} from "@/store/userinfo.js";

const form = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
}
const router = useRouter()
const ruleFormRef = ref(null)
const loading = ref(false)
const store = useUserinfo()
const onSubmit = () => {
  ruleFormRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    store.Login(form.value.username,form.value.password)
        .then(() => {
          toast('登录成功')
          router.push("/")
        })
        .finally(() => {
      loading.value = false
    })
  })
}

function onkeyup(e){
  if (e.key === "Enter"){
    onSubmit()
  }
}
onMounted(()=>{
  document.addEventListener("keyup",onkeyup)
})
onBeforeUnmount(()=>{
  document.removeEventListener("keyup",onkeyup)
})

</script>

<template>
  <el-row class="min-h-screen">
    <el-col :lg="16" :md="12" class="setFlex bgc hidden-xs-only">
      <div>
        <div class="font-bold text-6xl text-light-50 mb-4">welcome</div>
        <div class="text-light-50">this page is test page</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class=" bg-stone-50 setFlex flex-col">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="setFlex my-3 text-gray-300 space-x-2">
        <span class="setSpanLine"></span>
        <span>账号密码登录</span>
        <span class="setSpanLine"></span>
      </div>
      <el-form
          :model="form"
          :rules="rules"
          ref="ruleFormRef"
          class="w-250px"
      >
        <el-form-item prop="username">
          <el-input v-model="form.username" clearable placeholder="请输入账号">
            <template #prefix>
              <el-icon class="el-input__icon">
                <user/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" clearable show-password placeholder="请输入密码">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
              type="primary"
              color="#89f7fe"
              round class="w-[250px]"
              :loading="loading"
              @click="onSubmit"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.bgc{
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
}
.setFlex {
  @apply flex items-center justify-center;
}

.setSpanLine {
  @apply h-1px w-16 bg-gray-300;
}

</style>