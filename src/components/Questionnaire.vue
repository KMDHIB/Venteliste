<template>
  <div>
    <Question v-for="question in questions" :key="question.id" :question="question" />
    <button @click="submit">Submit</button>
    {{questions }}
  </div>
</template>

<script>
import { questions } from '../data/questions';
import Question from './Question.vue';

export default {
  name: 'Questionnaire',
  components: {
    Question,
  },
  data() {
    return {
      questions,
    };
  },
  methods: {
    submit() {
      console.log('Submitted answers:', this.questions);
    },
  },
};
</script>

<style scoped>
.question {
  margin-bottom: 1em;
}
</style>
