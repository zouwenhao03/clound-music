<template>
  <div class="second-nav">
    <div class="seco-container">
      <div
        class="content-container"
        v-for="menuItem in menuList"
        :key="menuItem.idx"
      >
        <div class="svg-logo">
          <svg-icon
            :class-name="menuItem.icon"
            :iconWidth="0.6"
            :iconClass="menuItem.icon"
          ></svg-icon>
        </div>
        <div class="word">{{ menuItem.text }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";

let menuList = reactive([
  { idx: 1, icon: "suggest", text: "每日推荐" },
  { idx: 2, icon: "fm", text: "私人FM" },
  { idx: 3, icon: "songslist", text: "歌单" },
  { idx: 4, icon: "paihang", text: "排行榜" },
  { idx: 5, icon: "book", text: "有声书" },
  { idx: 6, icon: "cd", text: "数字专辑" },
]);
</script>
<style lang="less" scoped>
.second-nav{
    width: 95vw;
    overflow: scroll;
}
.seco-container {
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  overflow: auto;
  width: 11rem;
  .content-container {
    width: 2.5rem;
    display: flex;
    flex-direction: column;
    .svg-logo {
      margin: 0 auto;
      margin-bottom: 0.15rem;
    }
    .word {
      text-align: center;
      //color: #ccc;
    }
  }
}
</style>
