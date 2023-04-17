<template>
  <div class="result-page">
    <div class="nav-part">
      <div class="search-nav">
        <svg-icon iconClass="back" :iconWidth="0.4" @click="goback"></svg-icon>
      </div>
      <van-tabs :active="activeTab" @click-tab="onClickTab">
        <van-tab title="综合">
          <div class="top-container" v-for="item in artists" :key="item.id">
            <div>
              <img :src="item.picUrl" alt="" />
              <div class="item-del">
                歌手： {{ item.name }}
                <span v-show="item.alia"
                  >({{ item.alia ? item.alia[0] : "" }})</span
                >
              </div>
            </div>
          </div>
          <div class="bottom-container">
            <div class="nav">
              <div>单曲</div>
              <van-button icon="play-circle" size="mini" round>播放</van-button>
            </div>
            <div
              class="content"
              v-for="item in songs"
              :key="item.id"
              @click="palyMusic(item.id)"
            >
              <div class="left">
                <img :src="item.al.picUrl" alt="" />
                <div class="text">
                  <div>{{ item.name }}</div>
                  <div>{{ item.al.name }}</div>
                </div>
              </div>
              <div>
                <svg-icon iconClass="more"></svg-icon>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="单曲">
          <div class="sec-content">
            <div class="nav">
              <div class="left">
                <svg-icon iconClass="paly"></svg-icon>
                <span>播放全部</span>
              </div>
              <div>
                <svg-icon iconClass="list"></svg-icon>
              </div>
            </div>
            <div class="content" v-for="item in songs" :key="item.id">
              <div class="left">
                <img :src="item.al.picUrl" alt="" />
                <div class="text">
                  <div>{{ item.name }}</div>
                  <div>{{ item.al.name }}</div>
                </div>
              </div>
              <div>
                <svg-icon iconClass="more"></svg-icon>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="歌单">
          <div class="third-tab">
            <div class="content" v-for="item in playlists" :key="item.id">
              <div class="left">
                <img :src="item.coverImgUrl" alt="" />
                <div class="text">
                  <div>{{ item.name }}</div>
                  <div>
                    {{ item.trackCount }}首音乐 by{{
                      item.creator.nickname
                    }},播放{{ item.playCount / 10000 }}万次
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="视频">
          <div v-for="item in videos" :key="item.id" class="video-container">
            <img :src="item.coverUrl" alt="" />
            <div class="right">
              <div class="title">{{ item.title }}</div>
              <div>时长{{ (item.durationms / 1000 / 60).toFixed(2) }}分</div>
              <div>{{ item.playTime / 10000 }}播放</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="歌手">
          <div class="top-container" v-for="item in artists" :key="item.id">
            <div>
              <img :src="item.picUrl" alt="" />
              <div class="item-del">
                歌手： {{ item.name }}
                <span v-show="item.alia"
                  >({{ item.alia ? item.alia[0] : "" }})</span
                >
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="播客">
          <div class="third-tab">
            <div class="content" v-for="item in djRadios" :key="item.id">
              <div class="left">
                <img :src="item.picUrl" alt="" />
                <div class="text">
                  <div>{{ item.name }}</div>
                  <div>
                    {{ item.programCount }}个声音 by{{
                      item.dj.nickname
                    }},播放{{ item.playCount / 10000 }}万次
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="歌词">
          <div class="lc-con" v-for="(item, idx) of lycs" :key="item.id">
            <div class="song-part">
              <div class="left">
                <img :src="item.al.picUrl" alt="" />
                <div>
                  <div>{{ item.name }}</div>
                  <div class="sec">{{ item.ar[0].name }}</div>
                </div>
              </div>
              <div>
                <svg-icon iconClass="more"></svg-icon>
              </div>
            </div>
            <div>
              <div class="lyc-part" :class="item.showAll ? 'show-all' : ''">
                <div v-for="(l, index) in item.lyrics" :key="index">
                  <div v-html="l"></div>
                </div>
              </div>
              <div @click="showAlllyc(idx)" class="show">
                {{ item.showWord }}
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="专辑">
          <div class="third-tab">
            <div class="content" v-for="item in albums" :key="item.id">
              <div class="left">
                <img :src="item.picUrl" alt="" />
                <div class="text">
                  <div>{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="用户">
          <div
            class="top-container2"
            v-for="item in userprofiles"
            :key="item.id"
          >
            <div></div>
            <div class="u-c">
              <img :src="item.avatarUrl" alt="" />
              <div class="item-delu">
                <div>{{ item.nickname }}</div>
                <div>{{ item.signature }}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSearchL } from "@/api/search.js";
import { useStore } from "vuex";
const route = useRoute();
const router = useRouter();
const activeTab = ref(0);
const store = useStore();
const keyword = route.query.word;
const goback = () => {
  router.go(-1);
};
const getSearchInfoList = async (type) => {
  let result = await getSearchL(keyword, type);
  return result.data.result;
  //return Promise.resolve(result.data.result)
};
onBeforeMount(() => {
  onClickTab({ name: 0 });
});
const showAlllyc = (index) => {
  if (lycs.value[index].showWord == "收起歌词") {
    lycs.value[index].showAll = false;
    lycs.value[index].showWord = "展开歌词";
  } else {
    lycs.value[index].showAll = true;
    lycs.value[index].showWord = "收起歌词";
  }
};
const artists = ref([]);
const songs = ref([]);
const playlists = ref([]);
const videos = ref([]);
const djRadios = ref([]);
const userprofiles = ref([]);
const albums = ref([]);
const lycs = ref([]);
const onClickTab = (v) => {
  let { name } = v;
  switch (name) {
    case 0:
      getSearchInfoList(1).then((res) => {
        songs.value = res.songs;
      });
      getSearchInfoList(100).then((res) => {
        artists.value = res.artists;
      });
      break;
    case 1:
      getSearchInfoList(1).then((res) => {
        songs.value = res.songs;
      });
      break;
    case 2:
      getSearchInfoList(1000).then((res) => {
        playlists.value = res.playlists;
      });
      break;
    case 3:
      getSearchInfoList(1014).then((res) => {
        videos.value = res.videos;
      });
      break;
    case 4:
      getSearchInfoList(100).then((res) => {
        artists.value = res.artists;
      });
      break;
    case 5:
      getSearchInfoList(1009).then((res) => {
        djRadios.value = res.djRadios;
      });
      break;
    case 6:
      getSearchInfoList(1006).then((res) => {
        lycs.value = res.songs;
        lycs.value.forEach((item) => {
          item.showAll = false;
          item.showWord = "展开歌词";
        });
        console.log(res.songs);
      });
      break;
    case 7:
      getSearchInfoList(10).then((res) => {
        albums.value = res.albums;
      });
      break;
    case 8:
      getSearchInfoList(1002).then((res) => {
        userprofiles.value = res.userprofiles;
      });
      break;
  }
};
const playIdList = computed(() => store.getters.playIdList);
const palyMusic = (musicId) => {
  if (playIdList.value.length == 0) {
    store.commit("SET_PLAYIDLIST", [musicId]);
    store.commit("SET_CURRERNTSID", musicId);
    store.commit("SET_ISPLAY", true);
  } else {
    store.commit("SET_CURRERNTSID", musicId);
    store.commit("SET_ISPLAY", true);
    let idList = playIdList.value;
    let index = idList.indexOf(musicId);
    if (index !== -1) {
      store.commit("SET_CURRENTINDEX", index);
      return;
    } else {
      idList.unshift(musicId);
      store.commit("SET_PLAYIDLIST", idList);
      store.commit("SET_CURRENTINDEX", 0);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.van-tabs__line {
  background: #f0d8ce !important;
}
.result-page {
  margin-bottom: 1.5rem;
  .nav-part {
    padding: 0.2rem;
  }
  .top-container {
    margin-top: 0.25rem;
    padding: 0.2rem;
    border-radius: 2%;
    box-shadow: 0px 2px 10px 0px rgba(240, 235, 235, 0.5);
    :first-child {
      font-size: 0.22rem;
      display: flex;
      align-items: center;
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin-right: 0.25rem;
      }
    }
    :nth-child(2) {
      .item-del {
        display: flex;
        align-items: center;
        span {
          margin-left: 0.1rem;
          font-size: 0.28rem;
          margin-bottom: 0;
        }
      }
    }
  }
  .bottom-container {
    margin-top: 0.5rem;
    padding: 0.2rem;
    border-radius: 1%;
    box-shadow: 0px 2px 10px 0px rgba(240, 235, 235, 0.5);
    .nav {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem;
    }
    .content {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem;
      .left {
        display: flex;
        img {
          width: 0.8rem;
          height: 0.8rem;
          margin-right: 0.2rem;
          border-radius: 0.05rem;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 0.28rem;
          :last-child {
            font-size: 0.18rem;
          }
        }
      }
    }
  }
  .sec-content {
    margin-top: 0.25rem;
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid #373634;
      .left {
        display: flex;
        align-items: center;
        span {
          font-size: 0.28rem;
          margin-left: 0.2rem;
        }
      }
    }
    .content {
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      padding: 0.2rem;
      border-bottom: 1px solid #373634;
      .left {
        display: flex;
        img {
          width: 0.8rem;
          height: 0.8rem;
          margin-right: 0.2rem;
          border-radius: 0.05rem;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 0.28rem;
          :last-child {
            font-size: 0.18rem;
          }
        }
      }
    }
  }
  .third-tab {
    .content {
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      padding: 0.2rem;
      border-bottom: 1px solid #373634;
      .left {
        display: flex;
        img {
          width: 0.8rem;
          height: 0.8rem;
          margin-right: 0.2rem;
          border-radius: 0.05rem;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 0.28rem;
          :last-child {
            font-size: 0.18rem;
          }
        }
      }
    }
  }
  .video-container {
    display: flex;
    padding: 0.2rem;
    img {
      width: 2.5rem;
      height: auto;
      margin-right: 0.2rem;
      border-radius: 2%;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 0.22rem;
      :first-child {
        font-size: 0.28rem;
      }
    }
  }
  .top-container2 {
    display: flex;
    padding: 0.25rem;
    .u-c {
      display: flex;
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
    }
  }

  .item-delu {
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    text-align: left;
    :first-child {
      font-size: 0.32rem;
    }
    :last-child {
      font-size: 0.24rem;
    }
  }
  .lc-con {
    .song-part {
      display: flex;
      margin-bottom: 0.2rem;
      justify-content: space-between;
      .left {
        display: flex;
        margin-right: 0.2rem;
        font-size: 0.28rem;
        img {
          width: 0.8rem;
          height: 0.8rem;
          margin-right: 0.2rem;
        }
      }
    }
    .lyc-part {
      //height: 3.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      margin-bottom: 0.25rem;
      font-size: 0.28rem;
    }
    .show-all {
      overflow: visible;
      display: block;
    }
    .show {
      margin-bottom: 0.2rem;
      font-size: 0.22rem;
    }
  }
}
</style>
