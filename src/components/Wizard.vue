<script setup>
import { ref, defineProps, defineEmits} from 'vue'

defineProps({
  currentStep: Number,
  steps: Array
})

const emit = defineEmits(['goToStep'])

const changeStep = (step) => {
    emit('goToStep', step)
}

</script>

<template>
    <div class="wizard-box">
        <div class="wizard">
            <div class="line"></div>
            <div v-for="(step, index) in steps" :key="index" class="step" v-bind:class="(index + 1) === currentStep ? 'active' : ''" @click="changeStep(index + 1)">
                <span>{{index + 1}}</span>
                <span class="title-box">{{step}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
