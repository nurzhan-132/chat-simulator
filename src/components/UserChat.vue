<template>
  <div class="chat-container">
    <h2>Чат с {{ chatUser.name }}</h2>
    <div class="chat-box">
      <div v-for="(msg, index) in chatMessages" :key="index" class="message">
        <strong>{{ msg.sender }}:</strong> {{ msg.text }}
      </div>
    </div>
    <input
      type="text"
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type a message"
    />
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
      newMessage: "",
      messages: [],
    };
  },
  computed: {
    currentUserId() {
      return parseInt(localStorage.getItem("currentUserId"), 10);
    },
    chatUserId() {
      return parseInt(this.$route.params.userId, 10);
    },
    chatUser() {
      return this.users.find((user) => user.id === this.chatUserId);
    },
    chatMessages() {
      const chatKey = this.getChatKey(this.currentUserId, this.chatUserId);
      return this.messages[chatKey] || [];
    },
  },
  created() {
    this.loadMessages();

    // Подписка на изменения в localStorage для синхронизации между вкладками
    window.addEventListener("storage", this.loadMessages);
  },
  methods: {
    getChatKey(user1, user2) {
      // Определяем ключ для хранения сообщений между двумя пользователями
      return [user1, user2].sort().join("_");
    },
    loadMessages() {
      const storedMessages = JSON.parse(localStorage.getItem("messages")) || {};
      this.messages = storedMessages;
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        const chatKey = this.getChatKey(this.currentUserId, this.chatUserId);
        const newMsg = {
          sender: this.users.find((user) => user.id === this.currentUserId)
            .name,
          text: this.newMessage,
        };

        if (!this.messages[chatKey]) {
          this.messages[chatKey] = [];
        }

        // Добавляем новое сообщение в локальный массив
        this.messages[chatKey].push(newMsg);

        // Сохраняем обновленный массив сообщений в localStorage
        localStorage.setItem("messages", JSON.stringify(this.messages));

        // Ручное обновление интерфейса для отображения нового сообщения
        this.newMessage = "";
        this.loadMessages(); // Принудительно загружаем обновленные сообщения
        this.$forceUpdate();
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.loadMessages);
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.chat-box {
  border: 1px solid #ccc;
  padding: 10px;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}
.message {
  margin: 5px 0;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
