const his = JSON.parse(localStorage.getItem("history"));
const search = {
  state: {
    historySw: his && his.length == 0 ? [] : his,
  },
  mutations: {
    SET_HISTORYSW: (state, word) => {
      const lastHis = JSON.parse(localStorage.getItem("history"));
      if (lastHis && lastHis.length > 0) {
        if (lastHis.includes(word)) return;
        lastHis.push(word);
        state.historySw = lastHis;
        localStorage.setItem("history", JSON.stringify(lastHis));
      } else {
        state.historySw = [word];
        localStorage.setItem("history", JSON.stringify([word]));
      }
    },
  },
};
export default search;
