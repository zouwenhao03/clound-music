<template>
  <div class="swiper-container">
    <van-swipe :autoplay="3000" lazy-render indicator-color="#FA464F">
      <van-swipe-item v-for="image in swiperImgs" :key="image">
        <img :src="image.pic" class="swiper-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getBananer } from "@/api/home";
const swiperImgs = ref(null);
onMounted(async () => {
  let { data } = await getBananer();
  swiperImgs.value = data.banners;
});
</script>
<style lang="less" scoped>
.swiper-container {
  margin-top: 0.3rem;
}
.swiper-img {
  width: 100%;
  height: 2.76rem;
  border-radius: 0.2rem;
}
</style>
