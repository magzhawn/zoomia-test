<template>
  <p>
    <span v-for="(char, index) in displayedText" :key="index">{{ char }}</span>
    <span v-if="isTyping" class="cursor">|</span>
  </p>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  text: string
  typingSpeed?: number
}>()

const displayedText = ref<string[]>([])
const isTyping = ref(true)
const typingSpeed = props.typingSpeed || 1 

const typeText = () => {
  const text = props.text
  let currentIndex = 0
  
  const interval = setInterval(() => {
    if (currentIndex < text.length) {
      displayedText.value.push(text[currentIndex])
      currentIndex++
    } else {
      clearInterval(interval)
      isTyping.value = false
    }
  }, typingSpeed)
}

onMounted(() => {
  typeText()
})

watch(() => props.text, () => {
  displayedText.value = []
  isTyping.value = true
  typeText()
})
</script>

<style scoped>
.cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style> 