<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import Spinner from './Spinner.vue';
import * as School from '../interfaces/school.ts';

const props = defineProps({
  school: School
});

const emit = defineEmits(['loggingIn'])

const loading = ref(false);

const logIn = () => {
    emit('loggingIn', true);
};

onMounted(() => {
    // setTimeout(() => {
    //     loading.value = false;
    // }, 1200);
});

</script>

<template>
    <div>
        <div v-if="loading">
            <Spinner text="Henter data..."/>
        </div>
        <div id="landing-page" v-if="!loading">
            <header>
                <img :src="school?.ImageBase64" alt="Logo" class="logo">
                
            </header>
            <section>
                <a type="button" class="btn btn-primary" @click="logIn"><!---->
                    <span>Opskriv
                        dit
                        barn
                        <span>
                            på {{ school?.Name }}
                        </span>
                        med
                    </span>
                    &nbsp;
                    <img src="../assets/mitid-logo.png" alt="Login med MitID">
                </a>
                <h5 class="text-center">
                    Her kan du opskrive børn, der bor på din folkeregisteradresse i Danmark. <br>
                    Har
                    du ikke MitID, bedes du venligst kontakte skolen.
                </h5>
            </section>
            <footer>
                <span>
                    {{ school?.Name }}<br /> {{ school?.Address }}<br> {{ school?.Zipcode }} {{ school?.City }}
                </span>
                <span class="copy-rights">
                    <span>
                        &copy;&nbsp;UVdata A/S
                    </span>
                    <span>
                        {{ new Date().getFullYear() }}
                    </span>
                </span>
                <span>
                    <a :href="'tel:' + school?.Phone">
                        {{ school?.Phone }}
                    </a><br>
                    <a :href="'mailto:' + school?.Email">
                        {{ school?.Email }}
                    </a>
                </span>
            </footer>
        </div>
    </div>

</template>

<style scoped></style>
