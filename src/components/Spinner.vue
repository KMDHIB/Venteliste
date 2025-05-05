<script setup>
import { ref } from 'vue'

defineProps({
  text: String,
})

</script>

<template>
  <div class="spinner-box">
    <div class="spinner">
      <img src="../assets/uvdata.svg" class="mrRotate" v-bind-alt="text" />
      <span>{{ text }}</span>
    </div>
  </div>

</template>

<style scoped>
.spinner-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9fa;
}

.spinner-box>* {
  text-align: center;
}

@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.spinner {
  height: 8rem;
  width: 8rem;
}

.spinner>* {
  text-align: center;
}

.spinner img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  -webkit-animation: rotating 0.5s ease-in-out infinite;
  -moz-animation: rotating 0.5s ease-in-out infinite;
  -ms-animation: rotating 0.5s ease-in-out infinite;
  -o-animation: rotating 0.5s ease-in-out infinite;
  animation: rotating 0.5s ease-in-out infinite;
}
</style>
