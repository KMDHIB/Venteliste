<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import Question from './Question.vue';

interface Props {
  questions: any[]
}

const props = defineProps<Props>();

const submit = () => {

}

</script>

<template>
  <div>
    <Question v-for="question in props.questions" :key="question.id" :question="question" />
    <button @click="submit">Submit</button>
  </div>
</template>

<style scoped>
.question {
  margin-bottom: 1em;
}
</style>
