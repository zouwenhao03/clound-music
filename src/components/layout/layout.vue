<template>
  <div class="layout">
    <van-config-provider :theme="activeTheme">
      <Head @fn="fn" ></Head>
      <router-view></router-view>
      <foot :theme="activeTheme"></foot>
      <left-part :theme="activeTheme"></left-part>
    </van-config-provider>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Head from "@/components/viewscom/home/head.vue";
import foot from "@/components/common/footer.vue";
import leftPart from "../common/leftPart.vue";
const activeTheme = ref("dark");
const fn = (val) => {
  console.log(555);
  activeTheme.value = val;
};
</script>
<style lang="less">
.layout{
  position: relative;
}
.van-theme-dark body {
  color: #f5f5f5;
  // background:rgba(31,25,53,0.8 )
  background: #1b1b25;
}
.van-theme-light body {
  color: #40434c;
  background: #f5f5f5;
}
/* 添加这段样式后，Primary Button 会变成红色 */
:root:root {
  --van-tabbar-height: 1rem;
}
</style>
