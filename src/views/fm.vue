<template>
  <div class="fm-page">
    <div class="swiper-part">
      <van-swipe  lazy-render indicator-color="#FA464F">
        <van-swipe-item v-for="image in bananerList" :key="image">
          <img :src="image.pic" class="swiper-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script setup>
import { getFmbananer } from "@/api/fm.js";
import { onBeforeMount, ref } from "vue";
onBeforeMount(() => {
  getBananerList();
});
const bananerList = ref([]);
const getBananerList = async () => {
  let {
    data: { data },
  } = await getFmbananer();
  bananerList.value = data;
};
</script>
<style lang="less" scoped>
.fm-page {
  padding: 0.2rem;
  .swiper-part {
    display: flex;
    justify-content: center;
    .swiper-img {
      height: 2.76rem;
      border-radius: 0.2rem;
    }
  }
}
</style>
