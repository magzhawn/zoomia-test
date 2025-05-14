<template>
    <div class="welcome-container">
        <h1 class="fade-in">Добро пожаловать в ИИ-ассистент по подбору автомобиля</h1>
        <h2 class="fade-in">Как я могу помочь?</h2>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.welcome-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    overflow-y: hidden;
}

.fade-in {
    animation: fadeIn 1s ease-in;
    opacity: 0;
    animation-fill-mode: forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>