<script setup>
import { onMounted, ref } from 'vue'
import * as Helpers from '../functions/Helpers.js'

defineProps({
    registration: Object,
    school: Object
})

const today = ref(new Date().getDate() +
    ". " +
    Helpers.translateMonth(new Date().getMonth() + 1).toLowerCase() +
    " " +
    new Date().getFullYear());

const emit = defineEmits(['loggingOut'])

const logOff = () => {
    emit('loggingOut', false);
};
</script>

<template>
    <div class="container">
        <div class="mt-3">
            <button class="btn btn-danger pull-right" @click="logOff()">Log ud</button>
            <h1>Bekr&aelig;ftelse</h1>
            <div class="callout callout-success">
                <p>Det bekr&aelig;ftes at nedenst&aring;ende &aelig;ndringer er gennemf&oslash;rt.</p>
                <p>Dato: <strong>{{ today }}</strong></p>
            </div>
            <div class="well">
                <h2>Tilmelding:</h2>
                <table>
                    <tbody>
                        <tr>
                            <td class="titleCol">Navn</td>
                            <td>{{ registration?.Name }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Skole</td>
                            <td>{{ school?.Name }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Skolestart</td>
                            <td>{{ registration?.SchoolStart }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Klassetrin</td>
                            <td>{{ registration?.SchoolClass }}. klasse</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Valgte specialfelter</td>
                            <td>
                                <template v-for="(specialField, index) in registration?.SpecialFields">
                                    {{ specialField }}<template
                                        v-if="index !== registration?.SpecialFields?.length - 1">,
                                    </template>
                                </template>
                            </td>
                        </tr>
                        <tr v-if="school?.LineCourses?.length > 0">
                            <td class="titleCol">Linjefag</td>
                            <td>{{ registration.LineCourse }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="well">
                <h2>Opskrivende voksen p&aring; barnets folkeregisteradresse:</h2>
                <table>
                    <tbody>
                        <tr>
                            <td class="titleCol">Navn</td>
                            <td>{{ registration?.ParentOne?.Name }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Mobil</td>
                            <td>{{ registration?.ParentOne?.Mobile }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Tlf. arbejde</td>
                            <td>{{ registration?.ParentOne?.WorkPhone }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Email</td>
                            <td>{{ registration?.ParentOne?.Email }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">For&aelig;ldermyndighed</td>
                            <td>{{ registration?.ParentOne?.HasCustody ? 'Ja' : 'Nej' }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">M&aring; kontaktes</td>
                            <td>{{ registration?.ParentOne?.Notify ? 'Ja' : 'Nej' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="registration?.ParentTwo?.Name?.trim().length > 0" class="well">
                <h2>Anden voksen p&aring; barnets folkeregisteradresse:</h2>
                <table>
                    <tbody>
                        <tr>
                            <td class="titleCol">Navn</td>
                            <td>{{ registration?.ParentTwo?.Name }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Mobil</td>
                            <td>{{ registration?.ParentTwo?.Mobile }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Tlf. arbejde</td>
                            <td>{{ registration?.ParentTwo?.WorkPhone }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Email</td>
                            <td>{{ registration?.ParentTwo?.Email }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">For&aelig;ldermyndighed</td>
                            <td>{{ registration?.ParentTwo?.HasCustody ? 'Ja' : 'Nej' }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">M&aring; kontaktes</td>
                            <td>{{ registration?.ParentTwo?.Notify ? 'Ja' : 'Nej' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="registration?.OtherContact?.Name?.trim().length > 0" class="well">
                <h2>For&aelig;lder eller kontaktperson bosiddende p&aring; anden adresse end barnets:</h2>
                <table>
                    <tbody>
                        <tr>
                            <td class="titleCol">Navn</td>
                            <td>{{ registration?.OtherContact?.Name }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Mobil</td>
                            <td>{{ registration?.OtherContact?.Mobile }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Tlf. arbejde</td>
                            <td>{{ registration?.OtherContact?.WorkPhone }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">Email</td>
                            <td>{{ registration?.OtherContact?.Email }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">For&aelig;ldermyndighed</td>
                            <td>{{ registration?.OtherContact?.HasCustody ? 'Ja' : 'Nej' }}</td>
                        </tr>
                        <tr>
                            <td class="titleCol">M&aring; kontaktes</td>
                            <td>{{ registration?.OtherContact?.Notify ? 'Ja' : 'Nej' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<style scoped>
.pull-right {
    float: right;
}
</style>
