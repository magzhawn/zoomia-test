<template>
  <form @submit.prevent="onSubmit" class="form">
    <div class="input-group">
      <div class="textarea-container">
        <textarea
          v-model="input"
          placeholder="Спроси про авто (например, «Что лучше для города?»)"
          @keydown.enter.exact.prevent="onSubmit"
          @input="autoResize"
          rows="1"
          ref="textarea"
        ></textarea>
      </div>
      <div class="button-container">
        <button type="button" @click="onClear" class="icon-button" title="Очистить">
          <i class="mdi mdi-delete-outline"></i>
        </button>
        <button type="submit" class="icon-button" title="Отправить">
          <i class="mdi mdi-send"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const input = ref('')
const textarea = ref<HTMLTextAreaElement | null>(null)

const emit = defineEmits<{
  (e: 'submit', message: string): void
  (e: 'clear'): void
}>()

const autoResize = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto'
    textarea.value.style.height = textarea.value.scrollHeight + 'px'
  }
}

onMounted(() => {
  autoResize()
})

const onSubmit = () => {
  const message = input.value.trim()
  if (message) {
    emit('submit', message)
    input.value = ''
    if (textarea.value) {
      textarea.value.style.height = 'auto'
    }
  }
}

const onClear = () => {
  emit('clear')
  if (textarea.value) {
    textarea.value.style.height = 'auto'
  }
}
</script>

<style scoped>
.form {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;  
  background-color: white;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 80%;
  margin: 0 auto;
}

.textarea-container {
  position: relative;
  flex: 1;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  resize: none;
  min-height: 2.5em;
  max-height: 200px;
  overflow-y: hidden;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  font-family: inherit;
  box-sizing: border-box;
  outline: none;
}

.button-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.icon-button {
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.54);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  width: 32px;
  height: 32px;
  line-height: 1;
}

.icon-button i {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.icon-button:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.icon-button:active {
  background-color: rgba(0, 0, 0, 0.08);
}
</style>