<template>
  <div class="home">
    <dragon-ball></dragon-ball>
    <!-- <second-head></second-head> -->
    <swiper></swiper>
    <recommendSong></recommendSong>
    <ranking-list></ranking-list>
  </div>
  
 
</template>

<script setup>
import dragonBall from '@/components/viewscom/home/dragonBall.vue';
import secondHead from '@/components/viewscom/home/secondHead.vue';
import swiper from '../components/viewscom/home/swiper.vue';
import recommendSong from '../components/viewscom/home/recommendSong.vue';
import rankingList from '../components/viewscom/home/rankingList.vue';
</script>
<style lang="less" scoped>
.home{
  padding: 0.2rem;
  //;
  margin-bottom: 2.6rem;
}
</style>
