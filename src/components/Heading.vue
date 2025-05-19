<script setup>
import { ref, defineProps } from 'vue'

defineProps({
  school: Object,
  isUpdate: Boolean = false
})

const emit = defineEmits(['logout'])

const logOff = () => {
    emit('logout')
}

</script>

<template>
  <div class="subscriptionContainer row">
        <header class="col-xs-12">
            <div class="addressContainer">
                <img v-if="school?.ImageBase64" :src="school.ImageBase64" class="img-responsive">
                <h4>{{school?.Name}}</h4>
                <p>
                    {{school?.Address}}<br/>
                    {{school?.Zipcode}} {{school?.City}}<br/>
                    Tlf.: <a v-bind:href="'tel:' + school?.Phone">{{school?.Phone}}</a><br>
                    E-mail: <a v-bind:href="'mailto:' + school?.Email">{{school?.Email}}</a>
                </p>
            </div>
            <div class="titleContainer">
                <div>
                    <h1 v-if="!school.WelcomeText && !isUpdate">Opskriv barn p&aring; {{school?.Name}}</h1>
                    <h1 v-if="!school.WelcomeText && isUpdate">Opdat&eacute;r barn p&aring; {{school?.Name}}</h1>
                    <h1 v-if="school.WelcomeText">{{school.WelcomeText}}</h1>
                    <p v-if="!school.SubHeading && !isUpdate">Udfyld nedenst&aring;ende formular for opskrivning af dit barn</p>
                    <p v-if="!school.SubHeading && isUpdate">Opdat&eacute;r hvis nedenst&aring;ende informationer har &aelig;ndret sig.</p>
                    <p v-if="school.SubHeading">{{school.SubHeading}}</p>
                </div>
            </div>
            <div class="logoutContainer">
                <label><button class="btn btn-danger" @click="logOff()">Log ud</button></label>
            </div>
        </header>
    </div>
</template>

<style scoped>

</style>
