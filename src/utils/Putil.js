import {ElMessage, ElMessageBox} from "element-plus";
import NProgress from "nprogress";

export function toast(message="", type = "success", dangerouslyUseHTMLString = false) {
    ElMessage({
        duration: 1500,
        offset: 300,
        showClose: true,
        message,
        type,
        dangerouslyUseHTMLString
    })
}

export function showModal(content="",type="",title="") {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type,
        }
    )
}

export function showFullLoading(){
    NProgress.start().start
}

export function hideFullLoading(){
    NProgress.done().done
}