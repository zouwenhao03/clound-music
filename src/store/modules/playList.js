const play = {
  state: {
    playList: [],
    playIdList: [],
    currentIndex: 0,
    isPlay: false,
    currentsId: "",
  },
  mutations: {
    SET_PALYLIST: (state, playlist) => {
      state.playList = playlist;
    },
    SET_CURRENTINDEX: (state, index) => {
      state.currentIndex = index;
    },
    SET_ISPLAY: (state, op) => {
      state.isPlay = op;
    },
    SET_CURRERNTSID: (state, id) => {
      state.currentsId = id;
    },
    SET_PLAYIDLIST:(state,idlist)=>{
      state.playIdList = idlist
    }
  },
  actions: {},
};
export default play;

let str =
  "[00:00.00] 作词 : 唐恬\n[00:01.00] 作曲 : 吴佩岭@房东的猫\n[00:02.00] 编曲 : 赖暐哲\n[00:03.00] 制作人 : 陈建骐\n[00:20.13]夕阳惹红操场 黄昏撒了糖\n";
//返回一个数组 如：
[
  { time: 0, lyc: " 作词 : 唐恬", nextTime: 0 },
  { time: 1000, lyc: " 作曲 : 吴佩岭@房东的猫", nextTime: 2000 },
  { time: 2000, lyc: " 编曲 : 赖暐哲", nextTime: 3000 },
  { time: 3000, lyc: " 制作人 : 陈建骐", nextTime: 20013 },
  { time: 20013, lyc: "夕阳惹红了操场 黄昏撒了糖", nextTime: 31008 },
];
//用js 中文注释
