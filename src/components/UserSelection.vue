<template>
  <div class="user-selection">
    <h2>Войдите в аккаунт</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        <button @click="selectUser(user.id)">{{ user.name }}</button>
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
  methods: {
    selectUser(userId) {
      // Сохраняем выбранного пользователя в localStorage
      localStorage.setItem("currentUserId", userId);
      // Перенаправляем на страницу списка чатов
      this.$router.push("/chat");
    },
  },
};
</script>

<style scoped>
.user-selection {
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
