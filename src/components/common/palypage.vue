<template>
  <transition name="van-slide-up">
    <div class="play-page">
      <div
        v-if="playList[currIndex]"
        class="bg"
        :style="{backgroundImage:`url(${playList[currIndex].al.picUrl})` }"
      ></div>
      <div class="container">
        <div class="top-nav">
          <svg-icon
            iconClass="arrowdown"
            :iconWidth="0.45"
            @click="emitClose"
          ></svg-icon>
          <div class="name">歌名</div>
          <svg-icon iconClass="share" :iconWidth="0.45"></svg-icon>
        </div>
        <div class="center">
          <img src="@/assets/img/needle.png" alt="" class="needle active-n" />
          <img src="@/assets/img/outdisc.png" alt="" class="disc" />
          <img
            src="@/assets/img/disc_default.png"
            alt=""
            class="default"
            v-if="!playList[currIndex]"
          />
          <img
            :src="playList[currIndex].al.picUrl"
            alt=""
            class="sImg"
            v-else
          />
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { defineEmits, computed } from "vue";
import { useStore, mapGetters } from "vuex";
const store = useStore();
const emits = defineEmits(["close"]);
const emitClose = () => {
  emits("close", false);
};
const playList = computed(() => store.state.play.playList);
const currIndex = computed(() => store.state.play.currentIndex);
const isPlay = computed(() => store.state.play.isPlay);
</script>
<style lang="less" scoped>
.play-page {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 102;
  .bg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(10px);
    z-index: -1;
    background-size: contain;
  }
  .container {
    padding: 0.2rem;
  }
  .top-nav {
    display: flex;
    justify-content: space-between;
  }
  .center {
    position: relative;
    .needle {
      width: 2rem;
      height: auto;
      top: 0.5rem;
      position: absolute;
      left: calc(50% - 0.5rem);
      z-index: 1;
      transform-origin: 0.5rem 0;
      transform: rotate(-10deg);
      transition: all 1s;
    }
    .active-n {
      transform: rotate(6deg);
    }
    .disc {
      width: 5rem;
      height: auto;
      position: absolute;
      top: 2.25rem;
      left: calc(50% - 2.5rem);
    }
    .default {
      position: absolute;
      width: 5rem;
      height: auto;
      left: calc(50% - 2.5rem);
      top: 2.25rem;
      transform: rotate(0);
      transition: all 5s;
    }
    .sImg {
      position: absolute;
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      left: calc(50% - 1.6rem);
      top: 3.2rem;
    }
    .active-d {
      transform: rotate(360);
    }
  }
}
</style>
