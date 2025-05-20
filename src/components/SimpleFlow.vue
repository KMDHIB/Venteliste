<script setup lang="ts">
import LandingPage from '../components/LandingPage.vue';
import { onMounted, ref } from 'vue'
import Registration from '../components/Registration.vue';
import Spinner from '../components/Spinner.vue';
import Receipt from '../components/Receipt.vue';
import Consent from '../components/Consent.vue';
import { Person } from '../types/Person.ts';
import { Child } from '../types/Child.ts';
import { Sibling } from '../types/Sibling.ts';
import * as DataService from '../functions/DataService.ts';
import * as Helpers from '../functions/Helpers.ts';

const loading = ref(true);
const done = ref(false);
const consent = ref(false);
const loggedIn = ref(false);
const children = ref<Child[] | null>(null);
const person = ref<Person | null>(null);
const postalCodes = ref(null);
const registration = ref(null);
import type { School } from '../types/School.ts';
const school = ref<School | null>(null);
const siblings = ref<Sibling[] | null>(null);
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
    const [postalCodeData, schoolData, questionnaireData] = await Promise.all([
      DataService.getPostalCodes(),
      DataService.getSchool(),
      DataService.getQuestionnaire()
    ]);

    person.value = {} as Person;
    children.value = [] as Child[];
    postalCodes.value = postalCodeData;
    registration.value = {} as any;
    school.value = schoolData;
    siblings.value = [] as Sibling[];
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
  <spinner v-if="loading" text="Henter data..." :logo="school?.ImageBase64 ? school.ImageBase64 : undefined"></spinner>
  <LandingPage v-if="!loading && !loggedIn && !done" :school="school" @loggingIn="handleLogin" />
  <Consent v-if="!loading && loggedIn && !consent && school" :school="school" @consentHandled="handleConsent" />
  <Registration v-if="!loading && loggedIn && consent && !done" :children="children ?? []" :person="person ?? {}" :postalCodes="postalCodes as any"
    :registration="registration as any" :school="school as any" :siblings="siblings as any" :questionnaire="questionnaire as any"
    @loggingOut="handleLogin" @done="handleDone" />
  <Receipt v-if="!loading && loggedIn && consent && done" :registration="registration as any" :school="school as any"
    @loggingOut="handleLogin" />
</template>

<style scoped></style>
