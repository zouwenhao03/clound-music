<template>
  <div class="layout">
    <van-config-provider :theme="activeTheme">
      <Head @fn="fn" v-if="showCom"></Head>
      <router-view></router-view>
      <playcontrol :theme="activeTheme" :position="positionf"></playcontrol>
      <foot :theme="activeTheme" v-if="showCom"></foot>
      <left-part :theme="activeTheme"></left-part>
    </van-config-provider>
  </div>
</template>
<script setup>
import { onUpdated, ref } from "vue";
import Head from "@/components/viewscom/home/head.vue";
import foot from "@/components/common/footer.vue";
import leftPart from "../common/leftPart.vue";
import playcontrol from "../common/playcontrol.vue";
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
const route = useRoute();
const showCom = ref(true);
const positionf = ref('')
onUpdated(() => {
  jundePath()
});
const activeTheme = ref("dark");
const fn = (val) => {
  console.log(555);
  activeTheme.value = val;
};
const jundePath =()=>{
  if(route.path == '/playList'){
    showCom.value =false
    positionf.value = 'bottom'
  }else{
    showCom.value = true
    positionf.value = ''
  }
}
onBeforeMount(()=>{
jundePath()
})
</script>
<style lang="less">
.layout {
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
