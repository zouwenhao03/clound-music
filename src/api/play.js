import qs from "qs";
import request from "@/utils/request";
export function getPlayList(id) {
  return request({
    url: `/playlist/detail?id=${id}`,
  });
}
//获取歌词
export function getLyric(id) {
  return request({
    url: `/lyric?id=${id}`,
  });
}
//获取歌曲url
export function getSongUrl(id) {
  const query = qs.stringify({
    timestamp: Date.now(),
    id,
  });
  console.log(query, 222);
  return request({
    url: `/song/url?${query}`,
    withCredentials:true
  });
}
//获取歌曲详情
export function getSongDetail(id) {
  return request({
    url: `/song/detail?ids=${id}`,
  });
}
//每日推荐
export function getrecommend() {
  return request({
    url: `/recommend/resource`,
  });
}
