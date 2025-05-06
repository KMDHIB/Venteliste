<script lang="ts" setup>
import { ref, defineProps, watch, onMounted } from 'vue'
import Heading from './Heading.vue';
import Wizard from './Wizard.vue';
import Selector from './Selector.vue';
import SchoolInfo from './SchoolInfo.vue';
import ContactInfo from './ContactInfo.vue';
import Finalize from './Finalize.vue';
import Questionnaire from './Questionnaire.vue';
import { Child } from '../interfaces/child.ts';
import { School } from '../interfaces/school.ts';
import { PostalCode } from '../interfaces/postalCode.ts';
import { Registration } from '../interfaces/registration.ts';

interface Props {
  children: Child[],
  person: Object,
  postalCodes: PostalCode[],
  registration: Registration,
  school: School,
  siblings: Object,
  questionnaire: any
}

const props = defineProps<Props>();

// defineProps({
//   children: Object,
//   person: Object,
//   postalCodes: Object,
//   registration: Object,
//   school: Object,
//   siblings: Object,
//   questionnaire: Object
// })

const emit = defineEmits(['done', 'loggingOut'])

const step = ref(1);
const steps = ref(["Vælg barn", "Opskrivning", "Kontaktpersoner", "Godkend"]);
const loadingNextStep = ref(false);
const errorText = ref(null);
const done = ref(false);
const registrator = ref(null);
const storedRegistration = ref(null);
const currentChildIndex = ref(0);

const logOff = () => {
  emit('loggingOut', false);
};

const wereDone = () => {
  emit('done', true);
};

const navigateToStep = (newStep) => {
  step.value = newStep;
};

const changeChild = (child) => {

};


const validateStep = (step) => {
  return true;
};

const changeStep = (adder) => {
  if (adder < 0) {
    if (step.value + adder <= 1) {
      step.value = 1;
      setTimeout(() => window.scrollTo(0, 0), 400);
    } else {
      step.value += adder;
      setTimeout(() => window.scrollTo(0, 0), 400);
    }
  } else {
    if (step.value == steps.value.length) {
      wereDone();
      step.value = 1;
    }
    else if (validateStep(step.value + adder)) {
      /* Handle special case for optional questionnaire */
      if (step.value == 2 && !(props.questionnaire.length > 0) && adder === 1) {
        step.value = 4;
      }
      else {
        step.value += adder;
      }
      
      setTimeout(() => window.scrollTo(0, 0), 400);
    }
  }
};

onMounted(() => {
  if (props.questionnaire.length > 0) {
    steps.value.splice(2, 0, "Spørgeskema");
  } 
  
  // setTimeout(() => {
  //   console.log(questionnaire.value);
  // }, 400);
 
});

// watch(
//   () => questionnaire.value,  
//   (newVal) => {
//     if (newVal) {
//       console.log(newVal);
//     }
//   }
// );

</script>

<template>
  <div class="container">
    <Heading :school="school" :isUpdate="false" @logout="logOff()" />
    <Wizard :currentStep="step" :steps="steps" @goToStep="navigateToStep($event)" />
    <div v-show="step === 1">
      <Selector :choices="children" @newSelected="changeChild($event)" />
    </div>
    <div v-show="step === 2">
      <SchoolInfo :registration="registration" :school="school" :siblings="siblings"
        :storedRegistration="registration" />
    </div>
    <div v-show="step === 3 && questionnaire">
      <Questionnaire :questions="questionnaire" />
    </div>
    <div v-show="step === 3 && !questionnaire">
      <ContactInfo :registration="registration" :postalCodes="postalCodes" :gprLink="school?.GDPRConditionLink" />
    </div>
    <div v-show="step === 4">
      <Finalize :registration="registration" :school="school" />
    </div>
    <div class="row mb-3">
      <div class="col-sm-12 d-flex justify-content-between">
        <span>
          <button v-if="step > 1" type="button" class="btn btn-primary" v-bind:disabled="loadingNextStep"
            @click="changeStep(-1)">
            Tilbage
          </button>
        </span>
        <span>
          <button type="button" class="btn btn-primary" v-bind:disabled="!validateStep(step) || loadingNextStep"
            @click="changeStep(1)">
            <span v-if="step !== 4">Forts&aelig;t</span>
            <span v-if="step === 4 && school?.UseEnrollmentFee && registration?.PaymentDue">Godkend og g&aring; til
              betaling</span>
            <span v-if="step === 4 && !(school?.UseEnrollmentFee && registration?.PaymentDue)">Godkend</span>
            <span v-if="loadingNextStep">
              &nbsp;
              <i class="fa fa-spinner fa-pulse"></i>
            </span>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
