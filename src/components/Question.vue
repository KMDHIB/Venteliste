<template>
  <div>
    <div v-if="question.type === 'text'">
      <label>{{ question.question }}</label>
      <input type="text" v-model="question.answer" @input="handleConditional" />
    </div>
    <div v-if="question.type === 'number'">
      <label>{{ question.question }}</label>
      <input type="number" v-model="question.answer" @input="handleConditional" />
    </div>
    <div v-if="question.type === 'boolean'">
      <label>{{ question.question }}</label>
      <input type="checkbox" v-model="question.answer" @change="handleConditional" />
    </div>
    <div v-if="question.type === 'checkbox'">
      <label>{{ question.question }}</label>
      <div v-for="option in question.options" :key="option">
        <input type="checkbox" :value="option" v-model="question.answer" @change="handleConditional" /> {{ option }}
      </div>
    </div>
    <div v-if="question.type === 'select'">
      <label>{{ question.question }}</label>
      <select v-model="question.answer" @change="handleConditional">
        <option disabled value="">Please select one</option>
        <option v-for="option in question.options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>

    <!-- Recursively render conditional questions -->
    <div v-if="conditionalQuestions.length">
      <Question v-for="conditionalQuestion in conditionalQuestions" :key="conditionalQuestion.id" :question="conditionalQuestion" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: Object,
  },
  components: {
    Question: () => import('./Question.vue'),
  },
  computed: {
    conditionalQuestions() {
      if (this.question.conditional) {
        const answer = this.question.answer;
        if (Array.isArray(answer)) {
          // For checkbox, handle multiple selections
          return answer.flatMap((ans) => this.question.conditional[ans] || []);
        } else {
          return this.question.conditional[answer] || [];
        }
      }
      return [];
    },
  },
  methods: {
    handleConditional() {
      if (this.question.conditional) {
        this.$forceUpdate();
      }
    },
  },
};
</script>

<style scoped>
.question {
  margin-bottom: 1em;
}
</style>
