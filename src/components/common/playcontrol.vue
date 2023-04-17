<template>
  <div
    class="control-part"
    :class="theme == 'light' ? 'light-theme' : ''"
    :style="position ? bottomP : ''"
  >
    <div class="container" v-if="songInfo">
      <div class="left" @click="showPage = true">
        <img
          :src="songInfo.al.picUrl"
          alt=""
          :class="isPlay ? 'active-i' : ''"
        />
        <div class="name">{{ songInfo.name }}</div>
        <div class="singername">{{ songInfo.ar[0].name }}</div>
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
      <audio ref="audio" :src="audioSrc"></audio>
    </div>
    <div class="container" v-else>
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
    <playpage
      v-show="showPage"
      @close="close"
      :currentTime="currentTime"
      :audioDuration="audioDuration"
      :progress="progress"
      :currentsId="currentsId"
      :currentT="currentT"
      :songInfo="songInfo"
    ></playpage>
  </div>
</template>
<script setup>
import {
  reactive,
  ref,
  watch,
  defineProps,
  computed,
  onMounted,
  nextTick,
} from "vue";
import { useStore, mapGetters } from "vuex";
import playpage from "./palypage.vue";
import moment from "moment";
import { getSongUrl, getSongDetail } from "@/api/play.js";
import { showNotify } from "vant";
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
const currentIndex = computed(() => store.getters.currentIndex);
const isPlay = computed(() => store.getters.isPlay);
const currentsId = computed(() => store.getters.currentsId);
// const currentId = computed(() => {
//   if (playList.value[currentIndex.value]) {
//     getSongU(`${playList.value[currentIndex.value].id}`);
//     return `${playList.value[currentIndex.value].id}`;
//   }
// });

const audio = ref(null);
const audioDuration = ref("00:00");
const currentTime = ref("00:00");
const currentT = ref(0);
const progress = ref(0);
watch(
  () => currentsId,
  () => {
    if (currentsId.value) {
      getSongU(currentsId.value);
      getSongD(currentsId.value);
      setTimeout(() => {
        if (audio.value && audioSrc.value && isPlay.value) {
          nextTick(() => {
            audio.value.play();
          });
        }
      }, 1000);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
watch(isPlay, () => {
  if (isPlay.value) {
    setTimeout(() => {
      nextTick(() => {
        if (audioSrc.value && audio.value) {
          audio.value.play();
        }
      });
    }, 800);
  } else {
    if (audio.value) {
      audio.value.pause();
    }
  }
});
watch(currentIndex, () => {
  if (isPlay.value && audio.value) {
    setTimeout(() => {
      nextTick(() => {
        audio.value.play();
      });
    }, 800);
  } else {
    //audio.value.pause();
  }
});
watch(audio, () => {
  if (audio.value) {
    audio.value.ontimeupdate = () => {
      progress.value = audio.value.currentTime / audio.value.duration;
      currentTime.value = transTime(audio.value.currentTime);
      currentT.value = audio.value.currentTime;
    };
    audio.value.oncanplay = () => {
      audioDuration.value = transTime(audio.value.duration);
    };
    audio.value.onended = () => {
      store.commit("SET_CURRENTINDEX", currentIndex.value + 1);
    };
  }
});
const transTime = (time) => {
  var duration = parseInt(time);
  var minute = parseInt(duration / 60);
  var sec = (duration % 60) + "";
  var isM0 = ":";
  if (minute == 0) {
    minute = "00";
  } else if (minute < 10) {
    minute = "0" + minute;
  }
  if (sec.length == 1) {
    sec = "0" + sec;
  }
  return minute + isM0 + sec;
};
const playMusic = (op) => {
  if (op) {
    audio.value.play();
    store.commit("SET_ISPLAY", true);
  } else {
    audio.value.pause();
    store.commit("SET_ISPLAY", false);
  }
};

const close = (val) => {
  showPage.value = val;
};
const audioSrc = ref(null);
const getSongU = async (id) => {
  let res = await getSongUrl(id);
  const url = res.data.data[0].url;
  if (!url) {
    showNotify("暂无资源  ");
  }
  audioSrc.value =url
  //audioSrc.value = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
const songInfo = ref(null);
const getSongD = async (id) => {
  let res = await getSongDetail(id);
  songInfo.value = res.data.songs[0];
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
      .active-i {
        animation: action 20s linear infinite;
        animation-delay: 1s;
      }
      @keyframes action {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
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
