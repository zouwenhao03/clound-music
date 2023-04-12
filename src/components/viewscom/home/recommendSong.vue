<template>
  <div class="recommend-top">
    <div class="recommend-songs">
      <div class="recommend-title">推荐歌曲</div>
      <div class="content-contaier">
        <div
          class="recommend-container"
          v-for="songs in recommendList"
          :key="songs.id"
        >
          <div class="recommend-items" @click="goPlayList(songs.id)">
            <div class="songs-pic">
              <img :src="songs.picUrl" alt="" />
            </div>
            <div class="songs-text">{{ songs.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getRecommendResource } from "@/api/home";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let recommendList = ref(null);
onBeforeMount(async () => {
  let {
    data: { result },
  } = await getRecommendResource();
  recommendList.value = result;
});
const goPlayList = (id) => {
  router.push(`/playList/${id}`);
};
</script>
<style lang="less" scoped>
.recommend-top {
  width: 95vw;
}
.recommend-songs {
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  .recommend-title {
    // color: #ccc;
  }
  .content-contaier {
    width: 95vw;
    overflow: auto;
    display: flex;
    .recommend-container {
      margin-top: 0.2rem;
      margin-right: 0.2rem;
      display: flex;
      align-items: center;
      .recommend-items {
        .songs-pic {
          img {
            width: 2.25rem;
            height: 2.25rem;
            border-radius: 0.2rem;
          }
        }
        .songs-text {
          min-height: 0.65rem;
          width: 2.25rem;
          overflow: hidden;
          font-size: 0.22rem;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          //color: #ccc;
          padding: 0.05rem;
        }
      }
    }
  }
}
</style>
