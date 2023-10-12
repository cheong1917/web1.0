import {useCookies} from "@vueuse/integrations/useCookies";

const TokenKey = "admin-token"

const cookies = useCookies()

export function GetToken(){
    return cookies.get(TokenKey)
}

export function SetToken(token){
    return cookies.set(TokenKey,token)
}

export function RemoveToken(){
    return cookies.remove(TokenKey)
}