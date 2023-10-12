import {logout, updatePassword} from "@/api/adminLogin.js";
import {showModal, toast} from "@/utils/Putil.js";
import {useUserinfo} from "@/store/userinfo.js";
import {useRouter} from "vue-router";


//修改密码
export function useRePassword() {
    const formDrawerRef = ref(null)
    const store = useUserinfo()
    const router = useRouter()
    const form = ref({
        oldPassword: '',
        newPassword: '',
        rePassword: ''
    })

//表单填写规则，红字显示
    const rules = {
        oldPassword: [
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        newPassword: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            }
        ],
        rePassword: [{
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
        }]
    }
    const ruleFormRef = ref(null)
    const onSubmit = () => {
        ruleFormRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            updatePassword(form.value.oldPassword, form.value.newPassword, form.value.rePassword)
                .then(() => {
                    toast("修改密码成功，请重新登录")
                    store.logout()
                    router.push("/login")
                }).finally(() => {
                formDrawerRef.value.offLoading()
            })
        })
    }

    const openRePasswordForm = () => {
        formDrawerRef.value.open()
    }

    return {
        ruleFormRef,
        form,
        formDrawerRef,
        rules,
        onSubmit,
        openRePasswordForm
    }
}


//退出登录
export function useLogOut() {
    const store = useUserinfo()
    const router = useRouter()

    function handelLogout() {
        showModal("是否退出登录", "warning", "Warning")
            .then(() => {
                logout().finally(() => {
                    store.logout()
                    router.push("/login")
                    toast("退出登录成功")
                })
            })
    }

    return {
        handelLogout
    }
}