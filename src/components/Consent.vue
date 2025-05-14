<script setup>
import { ref } from 'vue'

defineProps({
  school: Object
})

defineEmits(['consentHandled'])

</script>

<template>
  <div class="consent-box">
    <div class="well">
      <h2>Samtykke</h2>
      <p>
        For at kunne bruge ventelisten.net, skal du give dit samtykke til, at UVdata A/S må behandle dine oplysninger,
        samt
        indhente følgende personoplysninger om dig og dine børn:
      </p>
      <ul>
        <li>Navn</li>
        <li>Adresse</li>
        <li>CPR-nummer</li>
        <li>Forældremyndighed</li>
      </ul>
      <p>
        Du kan til enhver tid tilbagekalde dit samtykke ved at kontakte {{ school?.Name }}.
      </p>
      <p class="choice-box">
        <button class="btn btn-green" @click="$emit('consentHandled', true)">
          Jeg giver hermed mit samtykke
        </button>
        <button class="btn btn-red" @click="$emit('consentHandled', false)">
          Jeg ønsker ikke at give mit samtykke
        </button>
      </p>
    </div>
  </div>
</template>

<style scoped>
.consent-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9fa;

  .well {
    max-width: 600px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .choice-box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  button.btn-green {
    background-color: #28a745 !important;
    color: #fff !important;
  }

  button.btn-green:hover {
    background-color: #218838 !important;
  }

  button.btn-red {
    background-color: #dc3545 !important;
    color: #fff !important;
  }

  button.btn-red:hover {
    background-color: #c82333 !important;
  }

}
</style>
