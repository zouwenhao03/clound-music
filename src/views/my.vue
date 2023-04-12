<template>
  <div class="my-page">
    <div class="user-islogin" v-if="isLogin">
      <div :style="backGroundbg" class="top-container">
        <div class="avatar">
          <img :src="userInfo.avatarUrl" alt="" />
        </div>
        <div class="info-detail">
          <div class="user-name">{{ userInfo.nickname }}</div>
          <div class="fllows">
            <span>关注{{ userInfo.follows }}</span
            ><span>粉丝{{ userInfo.followeds }}</span>
            <span>Lv.{{ userlevel }}</span>
          </div>
          <div class="signature">{{ userInfo.signature }}</div>
        </div>
      </div>
      <div class="userLike">
        <div class="like-bg">
          <img :src="userLikes.coverImgUrl" alt="" />
        </div>
        <div class="like-text">
          <div class="like-top">{{ userLikes.name }}</div>
          <div class="like-num">{{ userLikes.trackCount }}首</div>
        </div>
        <div class="like-btn">心动模式</div>
      </div>
      <div class="user-playlist">
        <div class="top_text">创建歌单（{{ userPlaylist.length }}个）</div>
        <div class="paly-item" v-for="item in userPlaylist" :key="item.id">
          <div class="paly-bg">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div class="paly-text">
            <div class="text-top">{{ item.name }}</div>
            <div class="text-bottom">{{ item.trackCount }}首</div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-login" v-else>
      <Empty>
        <div @click="goLogin">消失一会儿，去登录就见面啦</div>
      </Empty>
      <div>
        <div class="text">独家放送</div>
        <van-swipe :autoplay="3000" lazy-render indicator-color="#FA464F">
          <van-swipe-item v-for="image in PersonalizedList" :key="image">
            <img :src="image.sPicUrl" class="swiper-img" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Empty } from "vant";
import { useRouter } from "vue-router";
import { getUserInfo, getUserPlaylist } from "@/api/user.js";
import { onBeforeMount, ref, computed, nextTick } from "vue";
import { getUserCookie } from "@/utils/userCookie";
import { getPersonalized } from "@/api/home.js";
import { mapState, useStore } from "vuex";
import useState from "@/hook/useStore.js";
const store = useStore();
const router = useRouter();
const goLogin = () => {
  router.push("/login");
};
let userInfo = ref({});
let isLogin = ref(false);
let PersonalizedList = ref([]);
let backGroundbg = ref("");
let userlevel = ref(null);
const userId = ref("");
onBeforeMount(async () => {
  if (!getUserCookie()) {
    let {
      data: { result },
    } = await getPersonalized();
    PersonalizedList.value = result;
    return;
  }
  userId.value = localStorage.getItem("useid");
  store.dispatch("getUserProfile").then(() => {
    isLogin.value = true;
    userInfo.value = store.getters.userInfo;
    userlevel.value = computed(()=>store.state.user.userLevel) ;
  });

  getUserPlay();
  //backGroundbg.value = `background:url("${profile.backgroundUrl}")no-repeat 10%/cover`;
});
//获取用户资料
// const getUserInfoList = async () => {
//   let {
//     data: { level, profile },
//   } = await getUserInfo(userId.value);
//   isLogin.value = true;
//   userInfo.value = profile;
//   userlevel.value = level;
// };

let userLikes = ref({});
let userPlaylist = ref([]);
//获取用户歌单
const getUserPlay = async () => {
  let {
    data: { playlist },
  } = await getUserPlaylist(userId.value);
  userLikes.value = playlist[0];
  userPlaylist.value = playlist.slice(1);
};
</script>
<style lang="less" scoped>
.no-login {
  //padding: 0.25rem;
  margin-bottom: 1.8rem;
  .van-empty {
    padding-bottom: 0.2rem;
  }
  img {
    width: 100%;
    height: 4.2rem;
    border-radius: 0.2rem;
  }
  .text {
    margin-bottom: 0.2rem;
  }
}
.my-page {
  padding: 0.25rem;
}
.user-islogin {
  position: relative;
  top: 0.6rem;
  background-size: contain;

  .top-container {
    height: 2.25rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    .avatar {
      text-align: center;
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        position: relative;
        top: -0.6rem;
      }
    }
    .info-detail {
      text-align: center;
      position: relative;
      top: -0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .user-name {
      font-weight: 700;
    }
    .fllows {
      display: flex;
      width: 40%;
      justify-content: space-around;
      align-items: center;
    }
    .fllows,
    .signature {
      font-size: 0.24rem;
    }
  }
  .userLike {
    margin-top: 0.2rem;
    width: 100%;
    height: 1.25rem;
    border-radius: 0.2rem;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    .like-bg {
      padding-left: 0.2rem;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 0.2rem;
      }
    }
    .like-text {
      margin-left: 0.2rem;
      display: flex;
      height: 0.9rem;
      flex-direction: column;
      justify-content: space-between;
      font-size: 0.28rem;
      .like-top {
        font-weight: 700;
      }
      .like-num {
        font-size: 0.2rem;
      }
    }
    .like-btn {
      font-size: 0.24rem;
      padding: 0.1rem;
      border-radius: 0.2rem;
      border: 1px solid #ccc;
      position: relative;
      right: -1rem;
    }
  }
  .user-playlist {
    margin-bottom: 3rem;
    .top_text {
      font-size: 0.22rem;
      margin-bottom: 0.15rem;
    }
    border: 1px solid #ccc;
    padding: 0.2rem;
    margin-top: 0.2rem;
    border-radius: 0.2rem;
    .paly-item {
      display: flex;
      width: 100%;
      height: 1.25rem;
      border-radius: 0.2rem;
      .paly-bg {
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 0.2rem;
        }
      }
      .paly-text {
        margin-left: 0.2rem;
        display: flex;
        height: 0.9rem;
        flex-direction: column;
        justify-content: space-between;
        font-size: 0.28rem;
        .text-top {
          font-weight: 700;
        }
        .text-bottom {
          font-size: 0.2rem;
        }
      }
    }
  }
}
</style>
