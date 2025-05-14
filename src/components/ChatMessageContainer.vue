<template>
  <div class="messages">
    <div
      v-for="(msg, i) in messages"
      :key="i"
      :class="['message', msg.role]"
    >
      <TypingMessage
        v-if="msg.role === 'assistant'"
        :text="msg.content"
      />
      <p v-else>{{ msg.content }}</p>
      <small>{{ new Date(msg.timestamp).toLocaleTimeString() }}</small>
    </div>
    <div v-if="loading" class="message assistant">
      <em>ИИ печатает...</em>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../types';
import TypingMessage from './TypingMessage.vue';

defineProps<{
  messages: Message[]
  loading: boolean
}>()
</script>

<style scoped>
.messages {
  flex: 1;
  overflow-y: hidden;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.message.user {
  align-self: flex-end;
  background-color: #f8f9fa;
  
}

.message.assistant {
  align-self: flex-start;
  background-color: #ffffff;
}

.message.system {
  align-self: center;
  background-color: #fff3e0;
  color: #e65100;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}

small {
  display: block;
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.25rem;
}
</style>
