import request from "@/utils/request";
export function getBananer() {
  return request({
    url: "/banner?type=2",
    method: "get",
  });
}
export function getRecommendResource() {
  return request({
    url: "/personalized?limit=10",
    method: "get",
  });
}
export function getTopList() {
  return request({
    url: "/toplist/detail",
  });
}
//首页-发现-圆形图标入口列表
export function getBallDel() {
  return request({
    url: "/homepage/dragon/ball",
  });
}
//独家放送
export function getPersonalized() {
  return request({
    url: "/personalized/privatecontent",
  });
}
