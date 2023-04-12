<template>
  <div>
    <van-swipe class="my-swipe" >
      <van-swipe-item>
        <div class="swiper-contianer">
          <div class="item-container" v-for="ball of ballList1" :key="ball.id">
            <div class="top-icon">
              <img :src="ball.iconUrl" alt="" />
            </div>
            <div class="bottom">{{ ball.name }}</div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="swiper-contianer">
          <div class="item-container" v-for="ball of ballList2" :key="ball.id">
            <div class="top-icon">
              <img :src="ball.iconUrl" alt="" />
            </div>
            <div class="bottom">{{ ball.name }}</div>
          </div>
        </div>
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">
            <div v-for="(t,i) in total" :key="i" class="ind-item" :class="active ==i?'activeitem':''"></div>
        </div>
      </template>
    </van-swipe>
  </div>
</template>
<script setup>
import { getBallDel } from "@/api/home";
import { onBeforeMount, onMounted, ref } from "vue";
const ballList1 = ref([]);
const ballList2 = ref([]);
onBeforeMount(async () => {
  let {
    data: { data },
  } = await getBallDel();

  ballList1.value = data.slice(0, 5);
  ballList2.value = data.slice(5);
});
</script>
<style lang="less" scoped>
.my-swipe .van-swipe-item {
  .swiper-contianer {
    display: flex;
    width: 100%;
    justify-content: space-around;
    .item-container {
      width: 15%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .top-icon {
        width: 0.6rem;
        height: 0.6rem;
        background-color: red;
        border-radius: 50%;
        margin-bottom: 0.15rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      .bottom {
        font-size: 0.24rem;
      }
    }
  }
}
.custom-indicator{
    display: flex;
    justify-content: center;
    margin-top: 0.2rem;
    .ind-item{
        width: 0.4rem;
        height: 0.1rem;
        border-radius: 5px;
        background: #fff;
        margin-right: 0.1rem;
    }
    .activeitem{
        background: red;
    }
}
</style>
