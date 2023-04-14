<template>
  <div
    class="control-part"
    :class="theme == 'light' ? 'light-theme' : ''"
    :style="position ? bottomP : ''"
  >
    <div class="container" v-if="playList[currIndex]" >
      <div class="left" @click="showPage = true">
        <img :src="playList[currIndex].al.picUrl" alt="" />
        <div class="name">{{ playList[currIndex].name }}</div>
        <div class="singername">{{ playList[currIndex].ar[0].name }}</div>
      </div>
      <div class="right">
        <svg-icon
          iconClass="paly"
          :iconWidth="0.45"
          @click="playMusic(true)"
          v-if="!isPlay"
        ></svg-icon>
        <svg-icon
          iconClass="stop"
          :iconWidth="0.45"
          @click="playMusic(false)"
          v-else
        ></svg-icon>
        <svg-icon iconClass="playList" :iconWidth="0.3"></svg-icon>
      </div>
      <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${playList[currIndex].id}.mp3`"
      ></audio>
    </div>
    <div class="container" v-else >
      <div class="left" @click="showPage = true">
        <svg-icon iconClass="cp" :iconWidth="0.45"></svg-icon>
        <div class="name">好音乐用心听</div>
        <div class="singername"></div>
      </div>
      <div class="right">
        <svg-icon iconClass="paly" :iconWidth="0.45"></svg-icon>
        <svg-icon iconClass="playList" :iconWidth="0.3"></svg-icon>
      </div>
    </div>
    <playpage v-show="showPage" @close="close"></playpage>
  </div>
</template>
<script setup>
import { reactive, ref, watch, defineProps, computed, onMounted } from "vue";
import { useStore, mapGetters } from "vuex";
import playpage from "./palypage.vue";
const store = useStore();
const props = defineProps({
  theme: {
    type: String,
    default: () => "dark",
  },
  position: {
    type: String,
    default: () => "",
  },
});
const showPage = ref(false);
const bottomP = ref("bottom:0");
const playList = computed(() => store.state.play.playList);
const currIndex = computed(() => store.state.play.currentIndex);
const isPlay = computed(() => store.state.play.isPlay);
onMounted(() => {});
const audio = ref(null);
const playMusic = (op) => {
  if (op) {
    audio.value.play();
    store.commit("SET_ISPLAY", true);
    // musicStatus.value = true;
  } else {
    audio.value.pause();
    store.commit("SET_ISPLAY", false);
    //musicStatus.value = false;
  }
};
const close = (val) => {
  showPage.value = val;
};
</script>
<style lang="less" scoped>
.control-part {
  width: 100%;
  height: 1rem;
  position: fixed;
  background: #1f1e23;
  bottom: 1.8rem;
  z-index: 101;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
      .name {
        font-size: 0.28rem;
        margin-right: 0.2rem;
      }
      .singername {
        font-size: 0.24rem;
        padding-top: 0.02rem;
      }
    }
    .right {
      display: flex;
      align-items: center;
      width: 1rem;
      justify-content: space-between;
    }
  }
}
.light-theme {
  background: #f7f7f7;
}
</style>
