import request from "@/utils/request";
export function getPlayList(id){
    return request({
        url:`/playlist/detail?id=${id}`
    })
}