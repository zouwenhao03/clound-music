import { createStore } from "vuex";
import user from "./modules/user";
import play from "./modules/playList";
import search from './modules/search'
import getters from "./getter";
export default createStore({
  modules: {
    user,
    play,
    search
  },
  getters,
});
