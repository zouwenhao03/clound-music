import request from "@/utils/request.js";
export function getSearchD() {
  return request({
    url: "/search/default",
  });
}
export function getSearchS(keyWord) {
  return request({
    url: `/search/suggest?keywords= ${keyWord}&type=mobile`,
  });
}
//热搜榜
export function getSearchH() {
  return request({
    url: `/search/hot/detail`,
  });
}
//热门电台
export function getHotD() {
  return request({
    url: `/dj/program/toplist?limit=10`,
  });
}
//专辑
export function getAleboard() {
  return request({
    url: `/album/songsaleboard?type=year&year=2023&albumType=0&limit=10`,
  });
}
export function getSearchL(keyWord,type) {
  return request({
    url: `/cloudsearch?keywords= ${keyWord}&type=${type}&limit=15`,
  });
}
