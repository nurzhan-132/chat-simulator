import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: ["User1", "User2", "User3"], // Предустановленные пользователи
    currentUser: null,
    chats: {}, // Сообщения между пользователями
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    addMessage(state, { sender, receiver, message }) {
      if (!state.chats[receiver]) {
        Vue.set(state.chats, receiver, []);
      }
      state.chats[receiver].push({ sender, message, timestamp: new Date() });
      localStorage.setItem("chats", JSON.stringify(state.chats));
    },
    loadChats(state) {
      const savedChats = localStorage.getItem("chats");
      if (savedChats) {
        state.chats = JSON.parse(savedChats);
      }
    },
  },
  actions: {
    sendMessage({ commit }, { sender, receiver, message }) {
      commit("addMessage", { sender, receiver, message });
    },
    initializeStore({ commit }) {
      commit("loadChats");
    },
  },
});
