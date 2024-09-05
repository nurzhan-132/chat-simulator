<template>
  <div class="chat-list">
    <h2>Выберите чат</h2>
    <ul>
      <li v-for="user in otherUsers" :key="user.id">
        <router-link :to="'/chat/' + user.id">{{ user.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: "Нуржан" },
        { id: 2, name: "Ирина" },
        { id: 3, name: "Ксения" },
      ],
    };
  },
  computed: {
    currentUserId() {
      return parseInt(localStorage.getItem("currentUserId"), 10);
    },
    otherUsers() {
      return this.users.filter((user) => user.id !== this.currentUserId);
    },
  },
};
</script>

<style scoped>
.chat-list {
  text-align: center;
  margin-top: 50px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
