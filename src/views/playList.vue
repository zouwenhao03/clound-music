<template>
  <div class="playList-page">
    <div class="top-part"></div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { getPlayList } from "@/api/play.js";
const route = useRoute();
const playListId = ref("");
const curplayList = ref({});
const pageBacImg = ref('')
onBeforeMount(() => {
  playListId.value = route.params.id;
  getPlayListInfo(playListId.value);
});
const getPlayListInfo = async (id) => {
  let res = await getPlayList(id);
  
  //curplayList.value = playList;
  //pageBacImg.value = `background:url("${playList.coverImgUrl}")no-repeat 10%/cover`;
};
</script>
<style lang="less" scoped>
</style>
