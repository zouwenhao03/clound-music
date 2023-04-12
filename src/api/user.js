import request from "@/utils/request";
export function getQrcodeKey() {
  return request({
    url: `/login/qr/key?timerstamp=${Date.now()} `,
    method: "get",
  });
}
export function getQrcodeImg(key) {
  return request({
    url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
    method: "get",
  });
}
export function reqLoginQRCheck(key) {
  return request({
    url: `/login/qr/check?key=${key}&timestamp=${Date.now()}`,
    method: "get",
  });
}
//用户信息
export function getUserInfo(id) {
  return request({
    url: `/user/detail?uid=${id}`,
    method: "get",
  });
}
export function getLoginStatus(cookie) {
  return request({
    url: `/login/status?timestamp=${Date.now()}`,
    method: "post",
    data: {
      cookie,
    },
  });
}

//用户歌单
export function getUserPlaylist(uid){
  return request({
    url:`/user/playlist?uid=${uid}`
  })
}
//推荐新歌
export function getNewsong(){
  return request({
    url:`/personalized/newsong?limit=6`
  })
}
//退出登录
export function logout(){
  return request({
    url:`/logout`
  })
}