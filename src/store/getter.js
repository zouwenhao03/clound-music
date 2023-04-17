import play from "./modules/playList";

const getters = {
  userInfo: (state) => state.user.userInfo,
  playList: (state) => state.play.playList,
  isPlay: (state) => state.play.isPlay,
  currentIndex: (state) => state.play.currentIndex,
  historySw: (state) => state.search.historySw,
  playIdList: (state) => state.play.playIdList,
  currentsId:(state)=>state.play.currentsId,
  isLogin:(state)=>state.user.isLogin
};
export default getters;
