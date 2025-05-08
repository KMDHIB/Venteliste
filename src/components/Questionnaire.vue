<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import Question from './Question.vue';

interface Props {
  questions: any[]
}

const props = defineProps<Props>();

</script>

<template>
  <div class="row well">
    <h2>Spørgeskema:</h2>
    <div class="row innerRow">
      <div class="col-xs-12">
        <Question v-for="question in props.questions" :key="question.id" :question="question" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.question {
  margin-bottom: 1em;
}
</style>
