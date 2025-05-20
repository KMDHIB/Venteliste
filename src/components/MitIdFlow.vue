<script setup>
import LandingPage from '../components/LandingPage.vue';
import { onMounted, ref } from 'vue'
import Registration from '../components/Registration.vue';
import Spinner from '../components/Spinner.vue';
import Receipt from '../components/Receipt.vue';
import Consent from '../components/Consent.vue';
import * as DataService from '../functions/DataService.ts';
import * as Helpers from '../functions/Helpers.ts';

const loading = ref(true);
const done = ref(false);
const consent = ref(false);
const loggedIn = ref(false);
const children = ref(null);
const person = ref(null);
const postalCodes = ref(null);
const registration = ref(null);
const school = ref(null);
const siblings = ref(null);
const questionnaire = ref(null);

const handleLogin = (loggingIn) => {
  loading.value = true;
  done.value = false;
  setTimeout(() => {
    loading.value = false;
    loggedIn.value = loggingIn;
  }, 400);
};

const handleDone = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    done.value = true;
  }, 400);
}

const handleConsent = (choice) => {
  loading.value = true;
  setTimeout(() => {
    Helpers.storeData("consent", choice, false);
    done.value = false;
    loggedIn.value = choice;
    consent.value = choice;
    loading.value = false;
  }, 400);
};

onMounted(async () => {  
  consent.value = Helpers.getData("consent", false) === true;

  try {
    const [childrenData, personData, postalCodeData, registrationData, schoolData, siblingData, questionnaireData] = await Promise.all([
      DataService.getChildren(),
      DataService.getPerson(),
      DataService.getPostalCodes(),
      DataService.getRegistration(),
      DataService.getSchool(),
      DataService.getSiblings(),
      DataService.getQuestionnaire()
    ]);

    children.value = childrenData;
    person.value = personData;
    postalCodes.value = postalCodeData;
    registration.value = registrationData;
    school.value = schoolData;
    siblings.value = siblingData;
    questionnaire.value = questionnaireData;
    
    if (school.value?.Styles) {
      Helpers.addStyleSheet(school.value.Styles);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <spinner v-if="loading" text="Henter data..." :logo="school?.ImageBase64 ? school.ImageBase64 : null"></spinner>
  <LandingPage v-if="!loading && !loggedIn && !done" :school="school" @loggingIn="handleLogin" />
  <Consent v-if="!loading && loggedIn && !consent" :school="school" @consentHandled="handleConsent" />
  <Registration v-if="!loading && loggedIn && consent && !done" :children="children" :person="person" :postalCodes="postalCodes"
    :registration="registration" :school="school" :siblings="siblings" :questionnaire="questionnaire"
    @loggingOut="handleLogin" @done="handleDone" />
  <Receipt v-if="!loading && loggedIn && consent && done" :registration="registration" :school="school"
    @loggingOut="handleLogin" />
</template>

<style scoped></style>
