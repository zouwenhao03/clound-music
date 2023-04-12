const userKey = 'USERCOOKIE'
export function setUserCookie(key){
    if(key){
        return localStorage.setItem(userKey,key)
    }else{
        return false
    }
}
 export function getUserCookie(){
    return localStorage.getItem(userKey)
 }

 export function removeUserCookie(){
    return localStorage.removeItem(userKey)
 }