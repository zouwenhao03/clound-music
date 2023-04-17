<template>
  <div class="footer-container" :class="theme=='light'?'light-theme':''">
    <div class="foot-menu">
      <div
        class="menu-item"
        v-for="menuItem in footMenuList"
        :key="menuItem.id"
      >
        <div
          class="logo-part"
          :class="activeIndex == menuItem.id ? 'active' : ''"
          @click="changeFooterItem(menuItem.id,menuItem.path)"
        >
          <svg-icon
            :class-name="menuItem.icon"
            :iconClass="menuItem.icon"
            :iconWidth="activeIndex == menuItem.id ? 0.55 : 0.45"
          ></svg-icon>
        </div>
        <div
          class="word"
          :class="activeIndex == menuItem.id ? 'active-text' : ''"
        >
          {{ menuItem.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch, defineProps } from "vue";
import { useRouter } from "vue-router";
const router  = useRouter()
const props = defineProps({
  theme: {
    type: String,
    default: () => "dark",
  },
});
console.log(props.theme.value)
const activeIndex = ref(1);
const footMenuList = reactive([
  { id: 1, icon: "musicLogo", text: "发现",path:'/home'},
  { id: 2, icon: "boke", text: "播客" ,path:'/fm'},
  { id: 3, icon: "my", text: "我的", width: 0.6,path:'/my' },
  { id: 4, icon: "fllow", text: "关注", width: 0.6,path:'/fllow' },
  { id: 5, icon: "community", text: "社区", width: 0.7 ,path:'/community'},
]);
const changeFooterItem = (id,path) => {
  activeIndex.value = id;
  router.push(path)
};
</script>
<style lang="less">
.footer-container {
  position: fixed;
  background: #1f1e23;
  width: 100vw;
  bottom: 0;
  height: 1.8rem;
  padding-bottom: 0.15rem;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.5) ;
  .foot-menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 1.5rem;
      .logo-part {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0.6rem;
      }
      .active {
        background: #fa464f;
        height: 0.6rem;
        width: 0.6rem;
        border-radius: 50%;
        color: #fff;
        text-align: center;
      }
      .active-text {
        color: #fa464f;
      }
    }
  }
}
.light-theme {
  background: #f7f7f7;
}
</style>
