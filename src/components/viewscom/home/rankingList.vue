<template>
  <div class="rank-container">
    <div class="word">排行榜</div>

    <van-swipe :loop="false"  indicator-color="#FA464F">
      <van-swipe-item v-for="top in topList" :key="top.id">
        <div class="rank-item">
          <div class="item-title">
            <div> {{ top.name }}</div>
            <div>{{ top.updateFrequency }}</div>
        </div>
          <div class="item-bottom">
            <div class="left-pic">
              <img :src="top.coverImgUrl" alt="" />
            </div>
            <div class="right-word">
              <div
                class="item-detail"
                v-for="(item, index) in top.tracks"
                :key="index"
              >
                {{ index + 1 }} {{ item.first }}{{ item.second }}
              </div>    
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { getTopList } from "../../../api/home";
let topList = ref(null);
onBeforeMount(async () => {
  let {
    data: { list },
  } = await getTopList();
  topList.value = list.slice(0, 5);
  console.log(topList);
});
</script>
<style lang="less" scoped>
.rank-container {
  margin-top: 0.2rem;
  .word {
    //color: #ccc;
    margin-bottom: 0.2rem;
  }
  .rank-item {
    border-radius: 0.3rem;
    margin-right: 0.1rem;
    padding: 0.2rem;
    //background: #fff;
    //border: 1px solid #fff;
    .item-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        :last-child{
            color: #ccc;
            font-size: 0.24rem;
        }
    }
    .item-bottom {
        margin-top: 0.1rem;
      display: flex;
      
      .left-pic {
        margin-right: 0.2rem;
        img {
          width: 2rem;
          height: 2rem;
          
        }
      }
      .right-word {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .item-detail {
         width: 3.8rem;
          overflow: hidden;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
