import { getUserInfo, getLoginStatus, logout } from "@/api/user.js";
import { getUserCookie } from "@/utils/userCookie.js";
const loginStatus = localStorage.getItem("isLogin") == 'false'?false:true
const user = {
  state: {
    userId: "",
    userInfo: {},
    userLevel: 0,
    isLogin: loginStatus ? loginStatus : false,
  },

  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_USERIFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_USERLVEL: (state, userLevel) => {
      state.userLevel = userLevel;
    },
    SET_ISLOGIN: (state, status) => {
      state.isLogin = status;
    },
  },

  actions: {
    getUserId({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          let {
            data: {
              data: {
                profile: { userId },
              },
            },
          } = await getLoginStatus();
          commit("SET_USERID", userId);
          commit("SET_ISLOGIN", true);
          localStorage.setItem("isLogin", true);
          localStorage.setItem("useid", userId);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    getUserProfile({ commit, state }) {
      let userId = localStorage.getItem("useid");
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await getUserInfo(userId);
          //console.log(data,888)
          commit("SET_USERIFO", data.profile);
          commit("SET_USERLVEL", data.level);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },
    uLogout({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await logout();
          localStorage.clear();
          commit("SET_ISLOGIN", false);
          localStorage.setItem("isLogin", false);
          //cookie.clear()
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};

export default user;
