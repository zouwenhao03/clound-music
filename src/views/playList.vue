<template>
  <div class="playList-page">
    <div class="top-part">
      <div class="nav-icon">
        <div class="icon-left">
          <svg-icon
            class-nam="back"
            iconClass="back"
            :iconWidth="0.45"
            @click="goBack"
          ></svg-icon>
        </div>
        <div class="right-icon">
          <svg-icon
            class-nam="search"
            iconClass="search"
            :iconWidth="0.45"
          ></svg-icon>
          <svg-icon
            class-nam="more"
            iconClass="more"
            :iconWidth="0.45"
          ></svg-icon>
        </div>
      </div>
      <img :src="curplayList.coverImgUrl" class="top-bg" alt="" />
      <div class="detail-part">
        <div class="left-img">
          <img :src="curplayList.coverImgUrl" alt="" />
        </div>
        <div class="right-text">
          <div class="title">{{ curplayList.name }}</div>
          <div class="desc">{{ curplayList.description }}</div>
          <div class="create-info">
            <img
              :src="curplayList.creator ? curplayList.creator.avatarUrl : ''"
              alt=""
            />
            <div class="create-name">
              {{ curplayList.creator ? curplayList.creator.nickname : "" }}
            </div>
          </div>
          <div class="tags">
            <span
              class="tag"
              v-for="(tag, index) in curplayList.tags"
              :key="index"
              >{{ tag }}</span
            >
          </div>
        </div>
      </div>
      <div class="user-use">
        <van-button round icon="share-o" size="small">{{
          curplayList.shareCount
        }}</van-button>
        <van-button round icon="chat-o" size="small">{{
          curplayList.commentCount
        }}</van-button>
        <van-button round icon="star-o" size="small">{{
          curplayList.subscribedCount
        }}</van-button>
      </div>
    </div>
    <div class="bottom-part">
      <div class="bottom-nav">
        <div class="left-p" @click="addPlayList">
          <svg-icon iconClass="paly" :iconWidth="0.45"></svg-icon>
          <div>
            播放全部（{{
              curplayList.tracks ? curplayList.tracks.length : ""
            }}）
          </div>
        </div>
        <div class="right-p">
          <svg-icon iconClass="download" :iconWidth="0.45"></svg-icon>
          <svg-icon iconClass="playList" :iconWidth="0.3"></svg-icon>
        </div>
      </div>
      <div class="songs-detail">
        <div
          class="container"
          v-for="(s, index) in curplayList.tracks"
          :key="s.id"
        >
          <div class="left" @click="startPlayM(index, s.id)">
            <div>{{ index + 1 }}</div>
            <div class="song-del">
              <div>{{ s.name }}</div>
              <div>{{ s.ar[0].name }}</div>
            </div>
          </div>
          <div class="right" >
            <svg-icon
              class-nam="more"
              iconClass="more"
              :iconWidth="0.45"
            ></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref,computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPlayList } from "@/api/play.js";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
const router = useRouter();
const playListId = ref("");
const curplayList = ref({});
const goBack = () => {
  router.go(-1);
};
onBeforeMount(() => {
  playListId.value = route.query.id;
  getPlayListInfo(playListId.value);
});
const getPlayListInfo = async (id) => {
  let res = await getPlayList(id);
  curplayList.value = res.data.playlist;
};
const addPlayList = () => {
  store.commit("SET_PALYLIST", curplayList.value.tracks);
};
const playList = computed(() => store.state.play.playList);
const currIndex = computed(() => store.state.play.currentIndex);
const startPlayM = (index,id) => {
  //先判断是否加入歌单
  if (playList.length > 0) {
    store.commit("SET_CURRENTINDEX", index);
  } else {
    store.commit("SET_PALYLIST", curplayList.value.tracks);
    store.commit("SET_CURRENTINDEX", index);
  }
};
</script>
<style lang="less" scoped>
.playList-page {
  //padding: 0.2rem;
  .top-part {
    width: 100%;
    height: 6rem;
    position: relative;
    .nav-icon {
      padding: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right-icon {
        width: 1rem;
        display: flex;
        justify-content: space-between;
      }
    }
    .detail-part {
      padding: 0.2rem;
      display: flex;
      align-items: center;
      margin-top: 0.5rem;
      .left-img {
        margin-right: 0.2rem;
        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.2rem;
        }
      }

      .right-text {
        width: 60%;
        height: 2.5rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .create-info {
          color: #ccc;
          font-size: 0.22rem;
          display: flex;
          align-items: center;
          img {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            margin-right: 0.2rem;
          }
        }
        .title {
          color: #ccc;
          font-size: 0.36rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .desc {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          font-size: 0.28rem;
          color: #ccc;
          margin-bottom: 0.15rem;
        }
        .tags {
          display: flex;
          .tag {
            font-size: 0.24rem;
            color: #ccc;
            margin-right: 0.15rem;
          }
        }
      }
    }
    .user-use {
      display: flex;
      justify-content: space-around;
    }
    .top-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 6.25rem;
      filter: blur(5px);
      z-index: -1;
    }
  }

  .bottom-part {
    position: relative;
    z-index: 100;
    padding: 0.2rem;
    border-radius: 2.5% 2.5% 0 0;
    margin-top: -0.6rem;
    box-shadow: 0px -0.1rem 0.1rem 0px rgba(0, 0, 0, 0.5);
    background: linear-gradient(
      0deg,
      rgba(34, 193, 195, 1) 0%,
      rgba(253, 187, 45, 1) 100%
    );
    background-size: 200% 200%;
    background-size: cover;

    .bottom-nav {
      //padding: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-p {
        position: relative;
        z-index: 100;
        font-size: 0.28rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        div {
          margin-left: 0.2rem;
        }
      }
      .right-p {
        // padding-right: 0.1rem;
        display: flex;
        align-items: center;
        margin-right: 0.25rem;
        width: 10%;
      }
    }
    .songs-detail {
      margin-top: 0.2rem;
      padding-bottom: 0.5rem;

      .container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .left {
          display: flex;
          align-items: center;
          .song-del {
            display: flex;
            flex-direction: column;
            width: 3rem;
            margin-left: 0.2rem;
            :first-child {
              font-weight: 700;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            :last-child {
              font-size: 0.24rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
