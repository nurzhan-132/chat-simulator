import Vue from "vue";
import Router from "vue-router";
import UserSelection from "./components/UserSelection.vue";
import ChatList from "./components/ChatList.vue";
import UserChat from "./components/UserChat.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "UserSelection",
      component: UserSelection,
    },
    {
      path: "/chat",
      name: "ChatList",
      component: ChatList,
    },
    {
      path: "/chat/:userId",
      name: "UserChat",
      component: UserChat,
    },
  ],
});
