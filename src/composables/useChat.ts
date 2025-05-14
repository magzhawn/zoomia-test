import { ref } from "vue";
import { sendMessageToAI } from "../services/chatService";
import type { Message } from "../types";

export function useChat() {
  const messages = ref<Message[]>([]);
  const loading = ref(false);

  const sendMessage = async (message: string) => {
    if (!message || loading.value) return;

    messages.value.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });
    loading.value = true;

    try {
      const reply = await sendMessageToAI(messages.value);
      messages.value.push(reply);
    } catch (error) {
      messages.value.push({
        role: "system",
        content:
          error instanceof Error
            ? `⚠️ ${error.message}`
            : "⚠️ Произошла ошибка",
        timestamp: new Date(),
      });
    } finally {
      loading.value = false;
    }
  };

  const clearChat = () => {
    messages.value = [];
  };

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
}
