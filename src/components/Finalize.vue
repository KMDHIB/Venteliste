<script setup>
import { ref } from 'vue'

defineProps({
    registration: Object,
    school: Object
})

const accepteptedTerms = ref(false);
const paymentFallBackUrl = ref('https://www.uvdata.dk/handelsbetingelser/');

</script>

<template>
    <div>
        <h1>Oversigt</h1>
        <div class="row">
            <div class="col-sm-12">
                <p>Godkend venligst rigtigheden af nedenst&aring;ende oplysninger for opskrivning p&aring; ventelisten:
                </p>
            </div>
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
                                {{ specialField }}<template v-if="index !== registration?.SpecialFields?.length - 1">,
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
        <div class="callout callout-info p-2 mb-3">
            <p v-if="school?.UseEnrollmentFee && registration?.PaymentDue">Ved opskrivning p&aring; ventelisten,
                {{ school?.Name }}, opkr&aelig;ves et gebyr p&aring; <strong>kr. {{ registration?.PaymentDue }},-
                    (DKK)</strong>.
            </p>
            <p v-if="school?.UseEnrollmentFee && registration?.PaymentDue">Ved godkendelse sendes du videre til et
                betalingsvindue. Du bedes derfor have dit kreditkort parat.
                <span>Du vil modtage en bekr&aelig;ftelse via e-mail.</span>
            </p>
            <p>Bekr&aelig;ftelse sendes til
                &nbsp;
                <strong class="mailItem">{{ registration?.ParentOne?.Email }}</strong>
                <span v-if="registration?.ParentTwo?.Notify && registration?.ParentTwo?.Email">
                    &#44;
                    <strong class="mailItem">{{ registration?.ParentTwo?.Email }}</strong>
                </span>
                <span v-if="registration?.OtherContact?.Notify && registration?.OtherContact?.Email">
                    &#44;
                    <strong class="mailItem">{{ registration?.OtherContact?.Email }}</strong>
                </span>
                <br />
                <span v-if="school?.UseEnrollmentFee && registration?.PaymentDue">
                    Kvittering for betaling sendes til
                    &nbsp;
                    <strong class="mailItem">{{ registration?.ParentOne?.Email }}</strong>
                    <span v-if="registration?.ParentTwo?.Notify && registration?.ParentTwo?.Email">
                        &#44;
                        <strong class="mailItem">{{ registration?.ParentTwo?.Email }}</strong>
                    </span>
                    <span v-if="registration?.OtherContact?.Notify && registration?.OtherContact?.Email">
                        &#44;
                        <strong class="mailItem">{{ registration?.OtherContact?.Email }}</strong>
                    </span>
                </span>
            </p>
            <p v-if="school?.UseEnrollmentFee && registration?.PaymentDue">
                <label>
                    <input type="checkbox" v-model="accepteptedTerms" />
                    <strong>
                        Jeg har l&aelig;st og accepterer
                        <a v-bind:href="school?.PaymentConditionLink ? school.PaymentConditionLink :paymentFallBackUrl"
                            target="_blank">
                            <span>betalingsbetingelserne</span>
                        </a>
                    </strong>
                </label>
            </p>
        </div>
    </div>
</template>

<style scoped></style>
