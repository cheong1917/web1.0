import service from "@/utils/request.js";

export function login(username, password) {
    return service.post("/admin/login", {
        username,
        password
    })
}

export function getinfo() {
    return service.post("/admin/getinfo")
}

export function logout() {
    return service.post("/admin/logout")
}

export function updatePassword(oldpassword,password,repassword) {
    return service.post("/admin/updatepassword",{
        oldpassword,
        password,
        repassword
    })
}