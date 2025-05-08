<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Question {
  id: string;
  type: 'text' | 'number' | 'boolean' | 'checkbox' | 'select';
  question: string;
  answer: any;
  options?: string[];
  conditional?: Record<string, Question[]>;
}

interface Props {
  question: Question;
}

const props = defineProps<Props>();

const conditionalQuestions = computed(() => {
  if (props.question.conditional) {
    const answer = props.question.answer;
    if (Array.isArray(answer)) {
      // For checkbox, handle multiple selections
      return answer.flatMap((ans) => (props.question.conditional ?? {})[ans] || []);
    } else {
      return props.question.conditional[answer] || [];
    }
  }
  return [];
});

function handleConditional() {
  if (props.question.conditional) {
    // $forceUpdate(); // Force update to re-evaluate conditionals
    // Vue 3 automatically reacts to changes, no need for $forceUpdate
  }
}

</script>

<template>
  <div class="question">
    <div v-if="props.question.type === 'text'">
      <label>{{ props.question.question }}</label>
      <input type="text" class="form-control" v-model="props.question.answer" @input="handleConditional" />
    </div>
    <div v-if="props.question.type === 'number'">
      <label>{{ props.question.question }}</label>
      <input type="number" class="form-control" v-model="props.question.answer" @input="handleConditional" />
    </div>
    <div v-if="props.question.type === 'boolean'">
      <label>{{ props.question.question }}</label>&nbsp;
      <input type="checkbox" v-model="props.question.answer" @change="handleConditional" />
    </div>
    <div v-if="props.question.type === 'checkbox'">
      <label>{{ props.question.question }}</label>
      <div v-for="option in props.question.options" :key="option">
        <input type="checkbox" :value="option" v-model="props.question.answer" @change="handleConditional" /> {{ option }}
      </div>
    </div>
    <div v-if="props.question.type === 'select'">
      <label>{{ props.question.question }}</label>
      <select class="form-control" v-model="props.question.answer" @change="handleConditional">
        <option disabled value="">Vælg venligst en</option>
        <option v-for="option in props.question.options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
    <div class="condional" v-if="conditionalQuestions.length">
      <Question v-for="conditionalQuestion in conditionalQuestions" :key="conditionalQuestion.id" :question="conditionalQuestion" />
    </div>
  </div>
</template>

<style scoped>
.question,.condional {
  margin-top: .5rem;
}
</style>
