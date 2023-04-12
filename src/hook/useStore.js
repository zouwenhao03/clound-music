/**
 * 在setup中使用mapState的封装
 * @param {*} mapArr 数组 | 对象
 */
import { computed } from "vue";
import { useStore, mapState } from "vuex";
export default function useState(mapArr) {
  // 获取store
  const store = useStore();
  // mapState 在 setup 中的使用(在这获取对应的函数),mapState是自己支持对象和数组的
  const arrFn = mapState(mapArr);
  const storeState = {};
  // 拿到arrFn中所有的key
  Object.keys(arrFn).forEach((fnKey) => {
    // 这里使用了 bind改变this指向
    const fn = arrFn[fnKey].bind({ $store: store });
    storeState[fnKey] = computed(fn);
  });
  return storeState;
}
