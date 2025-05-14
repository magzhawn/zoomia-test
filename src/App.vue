<template>
  <div class="chat">
    <Welcome v-if="messages.length === 0"/>
    <ChatMessageContainer
      :messages="messages"
      :loading="loading"
    />
    
    <ChatInput
      @submit="sendMessage"
      @clear="clearChat"
    />

  </div>
</template>

<script setup lang="ts">
import ChatInput from './components/ChatInput.vue';
import ChatMessageContainer from './components/ChatMessageContainer.vue';
import Welcome from './components/Welcome.vue';
import { useChat } from './composables/useChat';


const { messages, loading, sendMessage, clearChat } = useChat()
</script>

<style scoped>
.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
}
</style>