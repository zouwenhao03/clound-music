import Cookies from "js-cookie";
const userKey = 'USERCOOKIE'
export function setUserCookie(key){
    if(key){
        //return localStorage.setItem(userKey,key)
        Cookies.set(userKey,key)
    }else{
        return false
    }
}
 export function getUserCookie(){
    return Cookies.get(userKey)
    //return localStorage.getItem(userKey)
 }

 export function removeUserCookie(){
    return Cookies.remove(userKey)
    //return localStorage.removeItem(userKey)
 }