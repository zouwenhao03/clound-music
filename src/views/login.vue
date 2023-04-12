<template>
  <div class="login-part" :style="backGroundbg">
    <van-icon name="arrow-left" class="goBack" size="1.5em" @click="goBack" />
    <div class="qrcode-part">
      <img :src="qrcodeImg" />
      <div>请通过手机APP扫码登录</div>
    </div>
  </div>
</template>
<script setup>
import { getQrcodeKey, getQrcodeImg, reqLoginQRCheck } from "@/api/user.js";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { setUserCookie } from "@/utils/userCookie.js";
import { showNotify } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
let qrcodeImg = ref("");
let key = ref("");
const router = useRouter();
onBeforeMount(() => {
  getQrcodeKey().then((res) => {
    key.value = res.data.data.unikey;
    getQrcodeImg(key.value).then((res) => {
      qrcodeImg.value = res.data.data.qrimg;
      checkQRState(key.value);
    });
  });
});
const backGroundbg = ref('');
backGroundbg.value = `background:url("https://picsum.photos/750/700")no-repeat 10%/cover`;
const timer = ref(null);
const checkQRState = (key) => {
  timer.value = setInterval(async () => {
    try {
      let result = await reqLoginQRCheck(key);
      let code = result.data.code;
      if (code === 800) {
        showNotify({ type: "error", message: "二维码过期，请重新刷新" });
        clearInterval(timer.value);
      } else if (code === 803) {
        // 根据cookie获取账号信息l
        let cookie = result.data.cookie;
        setUserCookie(cookie);
        clearInterval(timer.value);
        store.dispatch("getUserId");
        showNotify({ type: "success", message: "登录成功" });
        setTimeout(()=>{
          router.go(-1)
        },1000)
      }
    } catch (err) {
      clearInterval(timer.value);
      showNotify({ type: "error", message: err });
    }
  }, 5000);
};
onBeforeUnmount(() => {
  clearInterval(timer.value);
  timer.value = null;
});
const goBack = ()=>{
  router.go(-1)
}
</script>
<style lang="less" scoped>
.login-part {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(101, 211, 169, 1) 30%,
    rgba(250, 70, 79, 1) 30%,
    rgba(250, 70, 79, 1) 67%,
    rgba(69, 213, 247, 1) 67%
  );
  // background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 200% 200%;
  animation: gradient 10s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.qrcode-part {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.goBack {
  position: absolute;
  top: 0.25rem;
  left: 0.2rem;
}
</style>
