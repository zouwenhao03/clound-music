<template>
  <div class="search">
    <div class="search-nav">
      <svg-icon iconClass="back" :iconWidth="0.4" @click="goback"></svg-icon>
      <van-search
        shape="round"
        placeholder="请输入搜索关键词"
        v-model="searchStr"
        @input="inputWord"
      />
      <div @click="searchDetail(searchStr)">搜索</div>
    </div>
    <div class="search-suglist" v-show="showSug">
      <div
        class="sug-item"
        v-for="(item, index) in sugList"
        :key="index"
        @click="searchDetail(item.keyword)"
      >
        <svg-icon iconClass="search" :iconWidth="0.35"></svg-icon>
        <span class="text">{{ item.keyword }}</span>
      </div>
    </div>
    <div class="his-ser">
      <div clas="title">历史搜索</div>
      <div class="container">
        <span v-for="(item, index) in searchHistoryW" :key="index">{{
          item
        }}</span>
      </div>
    </div>
    <hotList></hotList>
  </div>
</template>
<script setup>
import { onBeforeMount, ref, watch, computed } from "vue";
import { getSearchD, getSearchS, getSearchL } from "@/api/search.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import hotList from "@/components/viewscom/search/list.vue";
const router = useRouter();
const store = useStore();
const searchStr = ref("");
const showSug = ref(false);
const sugList = ref([]);
const goback = () => {
  if (showSug.value) {
    showSug.value = false;
  } else {
    router.go(-1);
  }
};
const getSearchDefaultKw = async () => {
  let {
    data: {
      data: { showKeyword },
    },
  } = await getSearchD();
  searchStr.value = showKeyword;
};
const getSearchSuggestList = async () => {
  //let {data:{result:{songs}}} = await getSearchL(searchStr.value);
  let {
    data: {
      result: { allMatch },
    },
  } = await getSearchS(searchStr.value);
  sugList.value = allMatch;
  showSug.value = true;
};
const inputWord = () => {
  getSearchSuggestList();
};
const searchHistoryW = computed(() => store.getters.historySw);
const searchDetail = (keyword) => {
  store.commit("SET_HISTORYSW", keyword);
  router.push({
    path: "/searchresult",
    query: {
      word: keyword,
    },
  });
};

watch(
  () => searchStr.value,
  () => {
    if (!searchStr.value) {
      showSug.value = false;
    }
  }
);
onBeforeMount(() => {
  getSearchDefaultKw();
});
</script>
<style lang="less" scoped>
.search {
  padding: 0.2rem;
  position: relative;
  .search-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .search-suglist {
    width: calc(100% - 0.4rem);
    height: calc(100vh - 1.2rem);
    position: absolute;
    top: 1.2rem;
    z-index: 101;
    background: #1b1b25;
    .sug-item {
      padding: 0.25rem;
      display: flex;
      align-items: center;
      font-size: 0.24rem;
      .text {
        margin-left: 0.2rem;
      }
    }
  }
  .his-ser{
    margin-bottom: 0.25rem;
   :first-child{
    font-size: 0.28rem;
    padding: 0.1rem;
   }
    .container{
      display: flex;
      span{
        padding: 0.1rem;
        font-size: 0.22rem;
        border-radius: 10%;
        box-shadow: 0px 2px 10px 0px rgba(240, 235, 235, 0.5);
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
