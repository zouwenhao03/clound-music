<template>
  <div class="nav-container">
    <div class="nav-left" @click="emitLeft">
      <svg-icon class-name="list" :iconWidth="0.5" iconClass="list"></svg-icon>
    </div>
    <div class="nav-center">
      <!-- <div class="search-input">
        <svg-icon
          class-name="search"
          :iconWidth="0.5"
          iconClass="search"
        ></svg-icon>
        <input type="text" placeholder="xxxxx" />
      </div> -->
      <van-search
        v-model="value"
        disabled
        shape="round"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="nav-right" @click="emitTheme">
      <svg-icon
        class-name="sun"
        :iconWidth="0.5"
        iconClass="sun"
        v-if="theme == 'dark'"
      ></svg-icon>
      <svg-icon
        class-name="moon"
        :iconWidth="0.5"
        iconClass="moon"
        v-else
      ></svg-icon>
    </div>
  </div>
</template>
<script setup>
import { defineEmits, ref } from "vue";
import emitter from "@/utils/bus";
const emit = defineEmits(["fn"]);
const theme = ref("dark");
const emitTheme = () => {
  if (theme.value == "dark") {
    theme.value = "light";
  } else {
    theme.value = "dark";
  }
  emit("fn", theme.value);
};
const leftStatus = ref(false);
const emitLeft = () => {
 // leftStatus.value = !leftStatus.value;
  leftStatus.value = true;
 // console.log(leftStatus.value)
  emitter.emit("changeStatus",leftStatus.value);
};
</script>
<style lang="less" scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  .nav-center {
    .search-input {
      display: flex;
      align-items: center;
      .search {
        margin: 0 5px 0 5px;
      }
    }
    input {
      background: rgba(31, 25, 53, -0.5);
      border: 0;
      outline: none;
      height: 0.3rem;
    }
  }
}
</style>
