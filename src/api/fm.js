import request from "@/utils/request";
export function getFmbananer(){
    return request({
        url:'/dj/banner'
    })
}