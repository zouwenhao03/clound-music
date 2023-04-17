<template>
  <div class="container">
    <div class="all-items">
      <div class="hot-item">
        <div class="item-head">热搜榜</div>
        <div class="content-con">
          <div
            class="con-del"
            v-for="(item, index) in list1"
            :key="index"
            @click="emitSearch(item.searchWord)"
          >
            <span :class="index < 3 ? 'top-index' : ''">{{ index + 1 }}</span>
            <span>{{ item.searchWord }}</span>
          </div>
        </div>
      </div>
      <div class="hot-item">
        <div class="item-head">播客榜</div>
        <div class="content-con">
          <div
            class="con-del"
            v-for="(item, index) in list2"
            :key="index"
            @click="emitSearch(item.program.name)"
          >
            <span :class="index < 3 ? 'top-index' : ''">{{ index + 1 }}</span>
            <span>{{ item.program.name }}</span>
          </div>
        </div>
      </div>
      <div class="hot-item">
        <div class="item-head">专辑榜</div>
        <div class="content-con">
          <div
            class="con-del"
            v-for="(item, index) in list3"
            :key="index"
            @click="emitSearch(item.albumName)"
          >
            <span :class="index < 3 ? 'top-index' : ''">{{ index + 1 }}</span>
            <span>{{ item.albumName }}</span>
            <span>{{ item.artistName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getSearchH, getHotD, getAleboard } from "@/api/search.js";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const list1 = ref([]);
const list2 = ref([]);
const list3 = ref([]);
const emitSearch = (keyword) => {
  store.commit("SET_HISTORYSW", keyword);
  router.push({
    path: "/searchresult",
    query: {
      word: keyword,
    },
  });
};
const getSearchHotList = async () => {
  let {
    data: { data },
  } = await getSearchH();
  list1.value = data.slice(0, 10);
};
const getHotDjList = async () => {
  let {
    data: { toplist },
  } = await getHotD();
  list2.value = toplist;
};
const getAleboardList = async () => {
  let {
    data: { products },
  } = await getAleboard();
  list3.value = products;
};

onBeforeMount(() => {
  getSearchHotList();
  getHotDjList();
  getAleboardList();
});
</script>
<style lang="less" scoped>
.container {
  width: calc(100vw - 0.4rem);

  .all-items {
    display: flex;
    width: 100%;
    overflow: auto;
  }
  .hot-item {
    min-width: 5rem;
    border-radius: 3%;
    box-shadow: 0px 2px 10px 0px rgba(240, 235, 235, 0.5);
    margin-right: 0.3rem;
    margin-bottom: 0.2rem;
    .item-head {
      padding: 0.25rem;
      font-size: 0.3rem;
      font-weight: 700;
      border-bottom: 0.5px solid #ccc;
    }
    .content-con {
      .con-del {
        font-size: 0.26rem;
        padding: 0.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        :first-child {
          margin-right: 0.2rem;
        }
        :nth-child(2) {
          font-size: 0.24rem;
          margin-right: 0.2rem;
        }
        :nth-child(3) {
          font-size: 0.24rem;
        }
        .top-index {
          color: #f0d8ce;
        }
      }
    }
  }
}
</style>
