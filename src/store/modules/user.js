import { getUserInfo, getLoginStatus,logout } from "@/api/user.js";
import { getUserCookie } from "@/utils/userCookie.js";
const user = {
  state: {
    userId: "",
    userInfo: {},
    userLevel: 0,
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
  },

  actions: {
    getUserId({ commit, state }) {
      let cookie = getUserCookie();
      return new Promise(async (resolve, reject) => {
        try {
          let {
            data: {
              data: {
                profile: { userId },
              },
            },
          } = await getLoginStatus(cookie);
          commit("SET_USERID", userId);
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
          let {data} = await getUserInfo(userId);
          //console.log(data,888)
          commit("SET_USERIFO",data.profile);
          commit("SET_USERLVEL", data.level);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },
    uLogout({commit,state}){
      return new Promise(async(resolve, reject) => {
         try {
          let res = await logout()
          console.log(res)
          localStorage.clear()
          //cookie.clear()
          resolve(true)
         } catch (error) {
          reject(error)
         }
      })
    }
  },
};

export default user;
