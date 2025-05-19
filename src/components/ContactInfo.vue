<script setup>
import { onMounted, ref } from 'vue'
import * as Helpers from '../functions/Helpers.js'

defineProps({
    registration: Object,
    postalCodes: Array,
    gprLink: String,
    useStudentInfo: Boolean
})

const isValid = () => {
    return (
        isParentOneMailPresent() &&
        isParentOneMailValid() &&
        isParentOnePhonePresent() &&
        isParentOnePhoneValid() &&
        isParentTwoMailPresent() &&
        isParentTwoMailValid() &&
        isParentTwoPhonePresent() &&
        isParentTwoPhoneValid() &&
        isParentTwoNameValid() &&
        isOtherContactMailPresent() &&
        isOtherContactMailValid() &&
        isOtherContactPhonePresent() &&
        isOtherContactPhoneValid() &&
        isOtherContactNameValid()
    );
};

const isParentOneMailPresent = () => {
    return true;
};

const isParentOneMailValid = () => {
    return true;
};

const isParentOnePhonePresent = () => {
    return true;
};

const isParentOnePhoneValid = () => {
    return true;
};

const isParentTwoMailPresent = () => {
    return true;
};

const isParentTwoMailValid = () => {
    return true;
};

const isParentTwoPhonePresent = () => {

    return true;
};

const isParentTwoPhoneValid = () => {

    return true;
};

const isParentTwoNameValid = () => {

    return true;
};

const isOtherContactMailPresent = () => {

    return true;
};

const isOtherContactMailValid = () => {

    return true;
};

const isOtherContactPhonePresent = () => {

    return true;
};

const isOtherContactPhoneValid = () => {

    return true;
};

const isOtherContactNameValid = () => {

    return true;
};

onMounted(() => {

});

</script>

<template>
    <div>
        <p v-if="gprLink">
            <strong><a v-bind:href="gprLink" target="_blank"><span>L&aelig;s mere her om hvordan skolen behandler
                        personoplysninger</span></a></strong>
        </p>
        <div v-if="useStudentInfo" class="row well">
            <h2>Kontaktinformationer på eleven</h2>
            <div class="row">
                <div class="col-sm-6">
                    <label>Navn</label>
                    <input class="form-control" type="text" v-bind:disabled="true" v-model="registration.Name" />
                </div>
                <div class="col-sm-6">
                    <label>Email</label>
                    <input class="form-control" maxlength="50" type="text" v-model="registration.Email"
                        v-bind:class="false ? 'is-invalid' : 'is-valid'" />

                </div>
                <div class="col-sm-6">
                    <label>Mobil</label>
                    <input class="form-control" maxlength="17" type="text" v-model="registration.Phone"
                        v-bind:class="false ? 'is-invalid' : 'is-valid'" />
                </div>
            </div>
        </div>
        <div class="row well">
            <h2>Voksne p&aring; barnets folkeregisteradresse</h2>
            <div class="row">
                <div class="col-sm-6">
                    <label>Navn</label>
                    <input class="form-control" type="text" v-bind:disabled="registration.ParentOne.HasValidCpr"
                        v-model="registration.ParentOne.Name" />
                </div>
                <div class="col-sm-6">
                    <label>Email</label>
                    <input class="form-control" maxlength="50" type="text" v-model="registration.ParentOne.Email"
                        v-bind:class="(!isParentOneMailPresent() || !isParentOneMailValid()) ? 'is-invalid' : 'is-valid'" />
                    <p v-if="!isParentOneMailPresent()">
                        <label class="text-danger">* Der skal angives en email </label>
                    </p>
                    <p v-if="isParentOneMailPresent() && !isParentOneMailValid()">
                        <label class="text-danger">* Der skal angives en gyldig email </label>
                    </p>
                </div>
                <div class="col-sm-6">
                    <label>Mobil</label>
                    <input class="form-control" maxlength="17" type="text" v-model="registration.ParentOne.Mobile"
                        v-bind:class="(!isParentOnePhonePresent() || !isParentOnePhoneValid()) ? 'is-invalid' : 'is-valid'" />
                    <p v-if="!isParentOnePhonePresent()">
                        <label class="text-danger">* Der skal angives et mobilnummer </label>
                    </p>
                    <p v-if="isParentOnePhonePresent() && !isParentOnePhoneValid()">
                        <label class="text-danger">* Der skal angives et gyldigt mobilnummer </label>
                    </p>
                </div>
                <div class="col-sm-6">
                    <label>Arbejdstelefon</label>
                    <input class="form-control" maxlength="17" type="text" v-model="registration.ParentOne.WorkPhone"
                        v-bind:class="registration.ParentOne?.WorkPhone?.length > 0 ? 'is-valid' : ''">
                </div>
                <div class=row></div>
                <div class="col-sm-6 form-check fixedBox">
                    <label class="checkbox form-check-label">
                        <input type="checkbox" v-bind:disabled="registration.ParentOne.HasValidCpr"
                            v-model="registration.ParentOne.HasCustody" />
                        Har for&aelig;ldermyndighed
                    </label>
                </div>
                <div class="col-sm-6 form-check fixedBox">
                    <label class="checkbox form-check-label">
                        <input type="checkbox" v-bind:disabled="true" v-model="registration.ParentOne.Notify" />
                        M&aring; kontaktes
                    </label>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-sm-6">
                    <label>Navn</label>
                    <input class="form-control" type="text" v-bind:disabled="registration.ParentTwo.HasValidCpr"
                        v-model="registration.ParentTwo.Name"
                        v-bind:class="!isParentTwoNameValid() ? 'is-invalid' : 'is-valid'" />
                    <p v-if="!isParentTwoNameValid()">
                        <label class="text-danger">* Der skal angives et navn </label>
                    </p>
                </div>
                <div class="col-sm-6">
                    <label>Email</label>
                    <input class="form-control" maxlength="50" type="text" v-model="registration.ParentTwo.Email"
                        v-bind:class="(!isParentTwoMailPresent() || !isParentTwoMailValid()) ? 'is-invalid' : 'is-valid'" />
                    <p v-if="!isParentTwoMailPresent()">
                        <label class="text-danger">* Der skal angives en email </label>
                    </p>
                    <p v-if="isParentTwoMailPresent() && !isParentTwoMailValid()">
                        <label class="text-danger">* Der skal angives en gyldig email </label>
                    </p>
                </div>
                <div class="col-sm-6">
                    <label>Mobil</label>
                    <input class="form-control" maxlength="17" type="text" v-model="registration.ParentTwo.Mobile"
                        v-bind:class="(!isParentTwoPhonePresent() || !isParentTwoPhoneValid()) ? 'is-invalid' : 'is-valid'" />
                    <p v-if="!isParentTwoPhonePresent()">
                        <label class="text-danger">* Der skal angives et mobilnummer </label>
                    </p>
                    <p v-if="isParentTwoPhonePresent() && !isParentTwoPhoneValid()">
                        <label class="text-danger">* Der skal angives et gyldigt mobilnummer </label>
                    </p>
                </div>
                <div class="col-sm-6">
                    <label>Arbejdstelefon</label>
                    <input class="form-control" maxlength="17" type="text" v-model="registration.ParentTwo.WorkPhone"
                        v-bind:class="registration.ParentTwo?.WorkPhone?.length > 0 ? 'is-valid' : ''">
                </div>
                <div class=row></div>
                <div class="col-sm-6 form-check fixedBox">
                    <label class="checkbox form-check-label">
                        <input type="checkbox" v-bind:disabled="registration.ParentTwo.HasValidCpr"
                            v-model="registration.ParentTwo.HasCustody" />
                        Har for&aelig;ldermyndighed
                    </label>
                </div>
                <div class="col-sm-6 form-check fixedBox">
                    <label class="checkbox form-check-label">
                        <input type="checkbox" v-model="registration.ParentTwo.Notify" />
                        M&aring; kontaktes
                    </label>
                </div>
            </div>
        </div>
        <br />
        <div class="row well">
            <h2>For&aelig;lder eller kontaktperson bosiddende p&aring; anden adresse end barnets</h2>
            <div class="row">
                <div class="col-sm-6">
                    <label>Navn</label>
                    <input class="form-control" type="text" v-model="registration.OtherContact.Name"
                        v-bind:class="!isOtherContactNameValid() ? 'is-invalid' : 'is-valid'" />
                    <p v-if="!isOtherContactNameValid()">
                        <label class="text-danger">* Der skal angives et navn </label>
                    </p>
                </div>
                <div class="col-sm-6">
                    <label>Email</label>
                    <input class="form-control" maxlength="50" type="text" v-model="registration.OtherContact.Email"
                        v-bind:class="(!isOtherContactMailPresent() || !isOtherContactMailValid()) ? 'is-invalid' : 'is-valid'" />
                    <p v-if="!isOtherContactMailPresent()">
                        <label class="text-danger">* Der skal angives en email </label>
                    </p>
                    <p v-if="isOtherContactMailPresent() && !isOtherContactMailValid()">
                        <label class="text-danger">* Der skal angives en gyldig email </label>
                    </p>
                </div>
                <div class="col-sm-6">
                    <label>Mobil</label>
                    <input class="form-control" maxlength="17" type="text" v-model="registration.OtherContact.Mobile"
                        v-bind:class="(!isOtherContactPhonePresent() || !isOtherContactPhoneValid()) ? 'is-invalid' : 'is-valid'" />
                    <p v-if="!isOtherContactPhonePresent()">
                        <label class="text-danger">* Der skal angives et mobilnummer </label>
                    </p>
                    <p v-if="isOtherContactPhonePresent() && !isOtherContactPhoneValid()">
                        <label class="text-danger">* Der skal angives et gyldigt mobilnummer </label>
                    </p>
                </div>
                <div class="col-sm-6">
                    <label>Arbejdstelefon</label>
                    <input class="form-control" maxlength="17" type="text" v-model="registration.OtherContact.WorkPhone"
                        v-bind:class="registration.OtherContact?.WorkPhone?.length > 0 ? 'is-valid' : ''" />
                </div>
                <div class="col-sm-6">
                    <label>Adresse</label>
                    <input class="form-control" maxlength="40" type="text" v-model="registration.OtherContact.Address"
                        v-bind:class="registration.OtherContact?.Address?.length > 0 ? 'is-valid' : ''" />
                </div>
                <div class="col-sm-6">
                    <label>Postnummer</label>
                    <select class="form-control" v-model="registration.OtherContact.PostalCode"
                        v-bind:class="registration.OtherContact?.PostalCode?.length > 0 ? 'is-valid' : ''">
                        <option value="0">V&aelig;lg By</option>
                        <option v-for="postalCode in postalCodes" v-bind:key="postalCode.Code"
                            v-bind:value="postalCode.Code">{{ postalCode.Code }} {{ postalCode.City }}</option>
                    </select>
                </div>
                <div class=row></div>
                <div class="col-sm-6 form-check fixedBox">
                    <label class="checkbox form-check-label">
                        <input type="checkbox" v-model="registration.OtherContact.HasCustody" />
                        Har for&aelig;ldermyndighed
                    </label>
                </div>
                <div class="col-sm-6 form-check fixedBox">
                    <label class="checkbox form-check-label">
                        <input type="checkbox" v-model="registration.OtherContact.Notify" />
                        M&aring; kontaktes
                    </label>
                </div>
            </div>
            <br />
        </div>
    </div>

</template>

<style scoped></style>
