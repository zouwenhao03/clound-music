<template>
  <transition name="van-slide-up">
    <div class="play-page" v-if="songInfo">
      <div
        class="bg"
        :style="{
          backgroundImage: `url(${songInfo.al.picUrl})`,
        }"
      ></div>
      <div class="top-nav">
        <svg-icon
          iconClass="arrowdown"
          :iconWidth="0.45"
          @click="emitClose"
        ></svg-icon>
        <div class="name">
          {{ songInfo ? songInfo.name : "" }}
        </div>
        <svg-icon iconClass="share" :iconWidth="0.45"></svg-icon>
      </div>
      <div v-show="!showLyc" @click="showLyc = true">
        <div class="container">
          <div class="center">
            <img
              src="@/assets/img/needle.png"
              alt=""
              class="needle"
              :class="isPlay ? 'active-n' : ''"
            />
            <img src="@/assets/img/outdisc.png" alt="" class="disc" />
            <img
              src="@/assets/img/disc_default.png"
              alt=""
              class="default"
              v-if="!songInfo"
            />
            <img
              :src="songInfo.al.picUrl"
              alt=""
              class="sImg"
              v-else
              :class="isPlay ? 'active-d' : ''"
            />
          </div>
          <div class="fun">
            <div class="fun-container">
              <svg-icon iconClass="playlike" :iconWidth="0.7"></svg-icon>
              <svg-icon iconClass="playcommit" :iconWidth="0.7"> </svg-icon>
              <svg-icon iconClass="download" :iconWidth="0.7"></svg-icon>
              <svg-icon iconClass="more2" :iconWidth="0.7"></svg-icon>
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="showLyc"
        @click="showLyc = false"
        class="lyc-part"
        ref="lycC"
      >
        <div
          v-for="(item, index) in lyricList"
          :key="index"
          class="lyc-item"
          :class="
            currentT * 1000 > parseInt(item.time) &&
            currentT * 1000 < parseInt(item.nextTime)
              ? 'active-lyc'
              : ''
          "
        >
          {{ item.lyc }}
        </div>
      </div>
      <div class="time-line">
        <div class="time">{{ currentTime }}</div>
        <div class="line">
          <div class="progress" :style="{ width: pwidth }"></div>
          <div class="round" :style="{ left: rleft }"></div>
        </div>
        <div class="time">{{ audioDuration }}</div>
      </div>
      <div class="control-part">
        <svg-icon
          iconClass="before"
          :iconWidth="0.7"
          @click="beforeSong"
        ></svg-icon>
        <svg-icon
          iconClass="stop2"
          :iconWidth="0.7"
          v-if="isPlay"
          @click="changeMusicState(false)"
        ></svg-icon>
        <svg-icon
          iconClass="play2"
          :iconWidth="0.7"
          v-else
          @click="changeMusicState(true)"
        ></svg-icon>
        <svg-icon
          iconClass="next"
          :iconWidth="0.7"
          @click="nextSong"
        ></svg-icon>
      </div>
    </div>
    <div class="play-page" v-else>
      <div class="bg default-bg"></div>
      <div class="container">
        <div class="top-nav">
          <svg-icon
            iconClass="arrowdown"
            :iconWidth="0.45"
            @click="emitClose"
          ></svg-icon>
          <div class="name"></div>
          <svg-icon iconClass="share" :iconWidth="0.45"></svg-icon>
        </div>
        <div class="center">
          <img src="@/assets/img/needle.png" alt="" class="needle" />
          <img src="@/assets/img/outdisc.png" alt="" class="disc" />
          <img src="@/assets/img/disc_default.png" alt="" class="default" />
        </div>
        <div class="fun">
          <div class="fun-container">
            <svg-icon iconClass="playlike" :iconWidth="0.7"></svg-icon>
            <svg-icon iconClass="playcommit" :iconWidth="0.7"> </svg-icon>
            <svg-icon iconClass="download" :iconWidth="0.7"></svg-icon>
            <svg-icon iconClass="more2" :iconWidth="0.7"></svg-icon>
          </div>
        </div>
        <div class="time-line">
          <div class="time">00:00</div>
          <div class="line"></div>
          <div class="time">00:00</div>
        </div>
        <div class="control-part">
          <svg-icon
            iconClass="before"
            :iconWidth="0.7"
            @click="beforeSong"
          ></svg-icon>
          <svg-icon iconClass="play2" :iconWidth="0.7"></svg-icon>
          <svg-icon iconClass="next" :iconWidth="0.7"></svg-icon>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import {
  defineEmits,
  computed,
  defineProps,
  watch,
  onBeforeMount,
  onMounted,
  ref,
} from "vue";
import { useStore, mapGetters } from "vuex";
import { showNotify } from "vant";
import { getLyric } from "@/api/play";
const store = useStore();
const emits = defineEmits(["close"]);
const emitClose = () => {
  emits("close", false);
};
const props = defineProps({
  currentTime: {
    type: String,
    default: () => "00:00",
  },
  audioDuration: {
    type: String,
    default: () => "00:00",
  },
  progress: {
    type: Number,
    default: () => 0,
  },
  currentsId: {
    type: Number,
    default: () => null,
  },
  currentT: {
    type: Number,
    default: () => 0,
  },
  songInfo: {
    type: Object,
    default: () => null,
  },
});
const playList = computed(() => store.state.play.playList);
const currentIndex = computed(() => store.getters.currentIndex);
const isPlay = computed(() => store.getters.isPlay);
const playIdList = computed(() => store.getters.playIdList);
const changeMusicState = (op) => {
  if (op) {
    store.commit("SET_ISPLAY", true);
  } else {
    store.commit("SET_ISPLAY", false);
  }
};
const beforeSong = () => {
  if (currentIndex.value) {
    store.commit("SET_CURRENTINDEX", currentIndex.value - 1);
    let id = playIdList.value[currentIndex.value];
    store.commit("SET_CURRERNTSID", id);
  } else {
    if (playIdList.length == 0) {
      showNotify({ message: "还未添加歌曲" });
    } else {
      showNotify({ message: "已经是第一首了" });
    }
  }
};
let pwidth = computed(() => {
  return `${props.progress * 4}rem`;
});
let rleft = computed(() => {
  return `${props.progress * 4 + 0.01}rem`;
});
const nextSong = () => {
  store.commit("SET_CURRENTINDEX", currentIndex.value + 1);
  let id = playIdList.value[currentIndex.value];
  store.commit("SET_CURRERNTSID", id);
};
watch(
  () => props.currentsId,
  () => {
    if (props.currentsId) {
      getcurLyric(props.currentsId);
    }
  }
);
const lycC = ref(null);
watch(
  () => props.currentT,
  () => {
    let activeLyc = document.querySelector(".active-lyc");
    let offsetTop = activeLyc ? activeLyc.offsetTop : 0;
    lycC.value.scrollTop = (offsetTop ? offsetTop : 80) - 80;
    lycC.value.scrollIntoView({
      behavior: "smooth",
    });
  }
);
const lyricList = ref([]);
const getcurLyric = async (id) => {
  let {
    data: {
      lrc: { lyric },
    },
  } = await getLyric(id);

  const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\][^\[]+/g;
  let match;

  const result = [];
  let currentTime = 0;

  while ((match = regex.exec(lyric))) {
    const minute = parseInt(match[1]);
    const second = parseInt(match[2]);
    const millisecond = parseInt(match[3]);

    const time = minute * 60 * 1000 + second * 1000 + millisecond;
    const lyc = match[0].replace(/\[\d{2}:\d{2}\.\d{2,3}\]/, "");
    result.push({ time, lyc });
    currentTime = time;
  }
  result.map((item, index) => {
    if (index == 0) {
      item.nextTime = 0;
    } else if (index + 1 == result.length) {
      item.nextTime = result[index].time;
    } else {
      item.nextTime = result[index + 1].time;
    }
  });

  // lyric = lyric.split(/\n/gis);
  // let arr = lyric.map((item) => {
  //   console.log(item);

  //   let sec = item.slice(1, 3);
  //   let min = item.slice(4, 6);
  //   let minn = item.slice(7, 10);
  //   let time =
  //     parseInt(sec) * 60 * 1000 + parseInt(min) * 1000 + parseInt(minn);
  //   let lyc = item.slice(10, item.length);
  //   return {
  //     time,
  //     lyc,
  //   };
  // });
  // arr = arr.filter((item) => item.lyc !== "");
  // arr.map((item, index) => {
  //   if (index == 0) {
  //     item.nextTime = 0;
  //   } else if (index + 1 == arr.length) {
  //     item.nextTime = arr[index].time;
  //   } else {
  //     item.nextTime = arr[index + 1].time;
  //   }
  // });
  lyricList.value = result;
};
const showLyc = ref(false);
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
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .default-bg {
    background-image: url("~@/assets/img/defaultbg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .container {
    padding: 0.2rem;
  }
  .top-nav {
    padding: 0.2rem;
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
      transform: rotate(0deg);
      transition: all 5s;
      top: 3.2rem;
    }
    @keyframes disc {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .active-d {
      animation: disc 20s linear infinite;
      animation-delay: 1s;
    }
  }
  .fun {
    position: absolute;
    top: 8.5rem;
    left: calc(50% - 2.5rem);
    .fun-container {
      margin: 0 auto;
      width: 5rem;
      display: flex;
      justify-content: space-between;
    }
  }
  .time-line {
    width: 6rem;
    position: absolute;
    top: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    left: calc(50% - 3rem);
    .line {
      height: 0.05rem;
      width: 4rem;
      background: #ccc;
      margin-bottom: 0.05rem;
      border-radius: 10%;
      position: relative;
      .progress {
        background: #fff;
        height: 0.05rem;
        position: absolute;
        top: 0;
        border-radius: 10%;
      }
      .round {
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        position: absolute;
        top: -0.03rem;
        background: #fff;
      }
    }
  }
  .control-part {
    width: 5rem;
    position: absolute;
    top: 11rem;
    left: calc(50% - 2.5rem);
    display: flex;
    justify-content: space-between;
  }
  .lyc-part {
    width: 100vw;
    height: 8.8rem;
    overflow: auto;
    text-align: center;
    font-size: 0.28rem;
    .lyc-item {
      padding: 0.2rem;
      color: #ccc;
    }
    .active-lyc {
      color: #f5f5f5;
    }
  }
}
</style>
