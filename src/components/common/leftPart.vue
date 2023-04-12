<template>
  <transition name="van-slide-left">
    <div
      class="left-part"
      v-if="openStatus"
      v-touch:swipeleft="leftSlide"
      :style="backGroundbg"
      :class="theme == 'light' ? 'light-theme' : ''"
    >
      <div class="hasLogin" v-if="isLogin">
        <div class="user-info">
          <div class="avatar"><img :src="userInfo.avatarUrl" alt="" /></div>
          <div class="nickName">{{ userInfo.nickname }}</div>
        </div>
        <div class="sayHi" id="sayHi">
          <!-- <div>{{ getWeekDate() }}好！</div>
          <div>这是今年的第{{ lastDay() }}天。</div>
          <div>
            这也是你来到这个星球的第<span>{{ days }}</span
            >天了。 我知道你在很努力的拥抱今天呢！
          </div> -->
        </div>
        <div class="weather-info" id="wif">
          <!-- 今天{{ weatherList.weather }}当前{{ weatherList.temperature_float }}℃
          空气湿度为{{ weatherList.humidity_float }} -->
        </div>
        <div class="newSongs" v-show="showSongs">
          <div class="title">这是为你推荐的新歌，希望你能喜欢</div>
          <div class="songs-container">
            <div class="song-item" v-for="item in newSongsList" :key="item.id">
              <div class="song-img"><img :src="item.picUrl" alt="" /></div>
              <div class="song-name">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="logout" @click="userLogout">退出登录</div>
      </div>
      <div v-else class="noLogin">
        <div class="sayHi" >
          <div>{{ getWeekDate().week }}好！</div>
          <div>这是今年的第{{ lastDay() }}天。</div>
        </div>
        <div class="weather-info" >
          今天{{ weatherList.weather }}当前{{ weatherList.temperature_float }}℃
          空气湿度为{{ weatherList.humidity_float }}
        </div>
        <div class="newSongs">
          <div class="title">这是为你推荐的新歌，希望你能喜欢</div>
          <div class="songs-container">
            <div class="song-item" v-for="item in newSongsList" :key="item.id">
              <div class="song-img"><img :src="item.picUrl" alt="" /></div>
              <div class="song-name">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div @click="toLogin">前往登录</div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import emitter from "@/utils/bus";
import { Empty } from "vant";
import { getUserCookie } from "@/utils/userCookie";
import Typed from "typed.js";
import { useRouter } from "vue-router";
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  defineProps,
  onUpdated,
  watch,
  nextTick,
} from "vue";
import { useStore } from "vuex";
import { getNewsong } from "@/api/user.js";
let openStatus = ref(false);
const store = useStore();
const props = defineProps({
  theme: {
    type: String,
    default: () => "dark",
  },
});
const isLogin = ref(false);
const userInfo = ref({});
const days = ref(0);
const newSongsList = ref([]);
const showSongs = ref(false);
//获取新歌推荐
const getNewsongList = async () => {
  let {
    data: { result },
  } = await getNewsong();
  newSongsList.value = result;
};
//背景
const getBackImg = () => {
  let id = Math.round(Math.random() * 100);
  fetch(`https://picsum.photos/id/${id}/info`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      backGroundbg.value = `background:url(${res.download_url})no-repeat 50%/cover`;
      //console.log(res,222)
    });
};
//星期
const getWeekDate = () => {
  var now = new Date();
  var day = now.getDay();
  var weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
  var week = weeks[day];
  let hour = now.getHours();
  let mintues = now.getMinutes();
  return { week, hour, mintues };
};
//过了多少天
const lastDay = () => {
  const today = new Date(); // 获取当前日期
  const yearStart = new Date(today.getFullYear(), 0, 1); // 获取本年度开始日期
  const diffTime = Math.abs(today - yearStart); // 计算两个日期的时间差（毫秒）
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 将时间差转换成天数并向上取整
  return diffDays;
};
//打字
watch(
  () => openStatus.value,
  () => {
    if (openStatus.value) {
      nextTick(() => {
        if(getUserCookie){
          typeText();
        }
      });
    }
  }
);
const typeText = () => {
  const { week, hour, mintues } = getWeekDate();
  const strA = [
    `${week}的${hour}时${mintues}分遇见你很开心！<br/>
        这是今年的第${lastDay()}天。<br/>
      这也是你来到这个星球的第${days.value} 天。<br/>
      我知道你在很努力的拥抱今天呢！<br/>`,
  ];
  const sayHi = document.getElementById("sayHi");
  const wif = document.getElementById("wif");
  const strB = [
    `今天${weatherList.value.weather}当前${weatherList.value.temperature_float}℃<br/>
      空气湿度为 ${weatherList.value.humidity_float}<br/>
      保持好心情哦。
      `,
  ];
  const optionB = setTypeOptions(strB, () => {
    showSongs.value = true;
  });
  const optionA = setTypeOptions(strA, () => {
    new Typed(wif, optionB);
  });
  new Typed(sayHi, optionA);
};
const setTypeOptions = (str, cb) => {
  const options = {
    strings: str,
    typeSpeed: 50,
    bindInputFocusEvents: true,
    autoInsertCss: false,
    showCursor: false,
    onComplete: cb,
  };
  return options;
};

//天气
const key = "5e25390a192c00c9a9c6303ffb26d4ba";
const weatherList = ref({});
const city = ref("110101");
const backGroundbg = ref("");
const getWeather = () => {
  fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?city=${city.value}&key=${key}`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      weatherList.value = res.lives[0];
    });
};
onBeforeMount(() => {
  getBackImg();

  emitter.on("changeStatus", (val) => {
    openStatus.value = val;
  });

  if (getUserCookie()) {
    isLogin.value = true;
    store.dispatch("getUserProfile").then((data) => {
      userInfo.value = store.getters.userInfo;
      days.value = data.createDays;
      city.value = store.getters.userInfo.city;
      getNewsongList();
      getWeather();
    });
  } else {
    getWeather();
    getNewsongList();
  }
});
onBeforeUnmount(() => {
  emitter.off("changeStatus");
});

const leftSlide = () => {
  openStatus.value = false;
  const sayHi = document.getElementById("sayHi");
  const wif = document.getElementById("wif");
  wif.innerHTML = "";
  sayHi.innerHTML = "";
  showSongs.value = false;
};
const userLogout = () => {
  store.dispatch("uLogout").then(() => {
    openStatus.value = false;
    const sayHi = document.getElementById("sayHi");
    const wif = document.getElementById("wif");
    isLogin.value = false
    wif.innerHTML = "";
    sayHi.innerHTML = "";
    showSongs.value = false;
  });
};
const router = useRouter()
const toLogin = ()=>{
 router.push('/login')
}
</script>
<style lang="less" scoped>
.left-part {
  width: 75vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #1f1e23;
  transition: width 3s;
}

.light-theme {
  background: #f7f7f7;
}

.hasLogin,.noLogin {
  position: relative;
  padding: 0.2rem;
  width: 100%;
  height: calc(100vh - 0.2rem);
  box-sizing: border-box;

  .user-info {
    display: flex;
    align-items: center;
    font-size: 0.28rem;

    .avatar {
      img {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
    }

    .nickName {
      height: 0.36rem;
      line-height: 0.32rem;
    }
  }

  .sayHi,
  .weather-info {
    font-size: 0.28rem;
    line-height: 0.55rem;
    margin-bottom: 0.2rem;
  }
  .newSongs {
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.28rem;
      font-weight: 700;
      margin-bottom: 0.2rem;
    }
    .songs-container {
      width: 100%;
      .song-item {
        display: flex;
        align-items: center;
        .song-img {
          margin-right: 0.2rem;
          img {
            width: 1rem;
            height: 1rem;
          }
        }
        .song-name {
          font-size: 0.22rem;
        }
      }
    }
  }
  .logout {
    position: absolute;
    right: 10px;
  }
}
</style>
