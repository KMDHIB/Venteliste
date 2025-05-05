<script setup>
import { ref, defineProps, defineEmits, defineExpose, onMounted } from 'vue'
import * as Helpers from '../functions/Helpers.js'

defineProps({
    registration: Object,
    school: Object,
    siblings: Object,
    storedRegistration: Object
})

const emit = defineEmits(['goToStep'])

defineExpose({
    // isValid,
    // setSpecialFields
});

const useKindergarten = ref(false);
const displaySiblings = ref(false);
const yearList = ref(new Array());
const selectedSibling = ref(null);
const showToast = ref(false);
const toastSubject = ref(null);
const toastBody = ref(null);

const isValid = () => {
    return (
        isSchoolYearValid() &&
        isSchoolClassValid() &&
        isSchoolClassYearAvailable() &&
        isSchoolYearCountValid() &&
        isLineCoursesValid() &&
        isFileUploadValid() &&
        isKindergartenValid()
      );
};

const isSchoolYearValid = () => {
    return (
        registration?.SchoolStart?.length > 0 &&
        registration?.SchoolStart !== "null"
      );
};

const isSchoolClassValid = () => {
    return (
        !isNaN(registration?.SchoolClass) &&
        registration?.SchoolClass != null
      );
};

const isSchoolClassYearAvailable = () => {
    if (
        storedRegistration?.SchoolStart ===
          registration?.SchoolStart &&
        storedRegistration?.SchoolClass === registration?.SchoolClass
      ) {
        return true;
      }

      return !school?.ClosedClasses
        ? true
        : !school.ClosedClasses.find(
            (x) =>
              x?.SchoolYear === registration?.SchoolStart &&
              x?.SchoolClass === registration?.SchoolClass
          );
};

const isSchoolYearCountValid = () => {
    return !school.IsPrivateOrFreeSchool
        ? !isNaN(registration?.NumberOfSchoolYears) &&
            registration?.NumberOfSchoolYears != null
        : true;
};

const isLineCoursesValid = () => {
    return school.LineCourses?.length > 0 &&
        registration?.SchoolClass >= school?.MenuVisibleFromClass
        ? registration.LineCourse?.length > 0 &&
            registration?.LineCourse !== "null"
        : true;
};

const isFileUploadValid = () => {
    return registration.Files?.length > 0
        ? sumFileUploadSize() < 15000000
        : true;
};

const isKindergartenValid = () => {
    if (useKindergarten) {
        const kindergartenMonth = registration?.Kindergarten?.KindergartenMonth;
        const kindergartenYear = registration?.Kindergarten?.KindergartenYear;

        const isMonthEmpty = !kindergartenMonth || kindergartenMonth === "null" || kindergartenMonth.length === 0;
        const isYearEmpty = !kindergartenYear || kindergartenYear === "null" || isNaN(kindergartenYear);

        return !(isMonthEmpty ^ isYearEmpty);
      }

      return true;
};

const toggleKindergarten = () => {
    if (!useKindergarten) {
        registration.Kindergarten.KindergartenYear = null;
        registration.Kindergarten.KindergartenMonth = null;
    }
};

const toggleSiblings = () => {
    if (!displaySiblings) {
        registration.Siblings = new Array();
    }
};

const alterSiblings = (sibling) => {
    if (!registration.Siblings.includes(sibling)) {
        registration.Siblings.push(sibling);
        selectedSibling = null;
    } else {
        const index = registration.Siblings.findIndex(
            (x) => x === sibling
        );

        if (index > -1) {
            registration.Siblings.splice(index, 1);
        }
    }
};

const setSpecialFields = (reset) => {
    setTimeout(() => {
        /* We're setting a new form. Thus, we need to apply any saved data */
        if (reset) {
            if (registration.SpecialFields?.length > 0) {
                for (const field of school?.SpecialFields) {
                    if (registration.SpecialFields.includes(field.Name)) {
                        field.Selected = true;
                    } else {
                        field.Selected = false;
                    }
                }
            }
        }

        registration.SpecialFields = new Array();

        for (const field of school.SpecialFields) {
            if (field.Selected) {
                registration.SpecialFields.push(field.Name);
            }
        }
    });
};

const addFile = (file) => {
    registration.Files.push(file);
};

const removeFile = (index) => {
    registration.Files.splice(index, 1);
};

const uploadError = (message) => {
    // toastSubject = message?.Heading;
    //     toastBody = message?.Message;
    //     showToast = true;

    // setTimeout(() => {
    //     showToast = false;
    //     toastBody = null;
    //     toastSubject = null;
    // }, 5000);
};


const sumFileUploadSize = () => {
    let size = 0;

    for (const file of registration.Files) {
        size += file.Size;
    }

    return size;
};

const getAge = (date) => {
    return Helpers.calculateAge(date);
};

const getMonth = (month) => {
    return Helpers.translateMonth(month);
};

onMounted(() => {
    for (let i = 0; i < 10; i++) {
        yearList.push(new Date().getFullYear() + i);
    }

    if (
        registration?.Kindergarten?.KindergartenYear ||
        registration?.Kindergarten?.KindergartenMonth
    ) {
        useKindergarten = true;
    }

    if (registration?.Siblings?.length > 0) {
        displaySiblings = true;
    }

    setSpecialFields(true);
});

</script>

<template>
    <div>
        <div class="row well">
            <h2>Opskrivning af {{ registration.Name.split(' ')[0] }} ({{ getAge(registration.BirthDay) }} &aring;r):
            </h2>
            <div class="row innerRow">
                <div class="col-md-6">
                    <label>&Oslash;nsket &aring;r for skolestart</label>
                    <select class="form-control" v-model="registration.SchoolStart"
                        v-bind:disabled="registration?.IsLocked"
                        v-bind:class="(!isSchoolYearValid() || !isSchoolClassYearAvailable()) ? 'is-invalid' : 'is-valid'">
                        <option value="null">V&aelig;lg skole&aring;r</option>
                        <option v-for="year in school.SchoolStart" v-bind:key="year" v-bind:value="year">{{ year }}
                        </option>
                    </select>
                    <p v-if="!isSchoolYearValid()">
                        <label class="text-danger">* Angiv &oslash;nsket &aring;r for skolestart </label>
                    </p>
                    <p v-if="!isSchoolClassYearAvailable()">
                        <label class="text-danger"
                            v-if="school.ClosedClasses.find(x => x?.SchoolYear === registration?.SchoolStart && x?.SchoolClass === registration?.SchoolClass)?.Message">*
                            {{school.ClosedClasses.find(x => x?.SchoolYear === registration?.SchoolStart &&
                                x?.SchoolClass === registration?.SchoolClass)?.Message}} </label>
                        <label class="text-danger"
                            v-if="!school.ClosedClasses.find(x => x?.SchoolYear === registration?.SchoolStart && x?.SchoolClass === registration?.SchoolClass)?.Message">*
                            Dette skole&aring;r er lukket for det valgte klassetrin </label>
                    </p>
                    <p v-if="registration?.IsLocked">
                        <label class="text-danger">* Skole&aring;r kan ikke &aelig;ndres. Kontakt skolen for yderligere
                            information. </label>
                    </p>
                </div>
                <div class="col-md-6">
                    <label>&Oslash;nsket klassetrin</label>
                    <select class="form-control" v-model="registration.SchoolClass"
                        v-bind:disabled="registration?.IsLocked"
                        v-bind:class="(!isSchoolClassValid() || !isSchoolClassYearAvailable()) ? 'is-invalid' : 'is-valid'">
                        <option value="null">V&aelig;lg skoleklasse</option>
                        <option v-for="schoolClass in school.SchoolClasses" v-bind:key="schoolClass"
                            v-bind:value="schoolClass">{{ schoolClass }}. klasse</option>
                    </select>
                    <p v-if="!isSchoolClassValid()">
                        <label class="text-danger">* Angiv &oslash;nsket skoleklasse </label>
                    </p>
                    <p v-if="!isSchoolClassYearAvailable()">
                        <label class="text-danger"
                            v-if="school.ClosedClasses.find(x => x?.SchoolYear === registration?.SchoolStart && x?.SchoolClass === registration?.SchoolClass)?.Message">*
                            {{school.ClosedClasses.find(x => x?.SchoolYear === registration?.SchoolStart &&
                                x?.SchoolClass === registration?.SchoolClass)?.Message}} </label>
                        <label class="text-danger"
                            v-if="!school.ClosedClasses.find(x => x?.SchoolYear === registration?.SchoolStart && x?.SchoolClass === registration?.SchoolClass)?.Message">*
                            Dette klassetrin er lukket for det valgte skole&aring;r </label>
                    </p>
                    <p v-if="registration?.IsLocked">
                        <label class="text-danger">* Skoleklasse kan ikke &aelig;ndres. Kontakt skolen for yderligere
                            information. </label>
                    </p>
                </div>
                <div v-if="!school?.IsPrivateOrFreeSchool && !(school?.UseEnrollmentFee && registration?.PaymentDue)"
                    class="col-md-6">
                    <label>&Oslash;nsket antal skole&aring;r</label>
                    <select class="form-control" v-model="registration.NumberOfSchoolYears"
                        v-bind:disabled="registration?.IsLocked"
                        v-bind:class="!isSchoolYearCountValid() ? 'is-invalid' : 'is-valid'">
                        <option value="null">V&aelig;lg antal skole&aring;r</option>
                        <option value="1">1 &aring;r</option>
                        <option value="2">2 &aring;r</option>
                        <option value="3">3 &aring;r</option>
                    </select>
                    <p v-if="!isSchoolYearCountValid()">
                        <label class="text-danger">* Angiv &oslash;nsket antal skole&aring;r </label>
                    </p>
                    <p v-if="registration?.IsLocked">
                        <label class="text-danger">* &Oslash;nsket antal skole&aring;r kan ikke &aelig;ndres. Kontakt
                            skolen for yderligere information. </label>
                    </p>
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label>Kommentarer</label>
                    <textarea class="form-control" cols="50" maxlength="1000" rows="3" v-model="registration.Comments"
                        v-bind:class="registration.Comments?.length > 0 ? 'is-valid' : ''"></textarea>
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label>Nuv&aelig;rende skole/inst./b&oslash;rnehave</label>
                    <input class="form-control" maxlength="100" type="text" v-model="registration.CurrentSchool"
                        v-bind:class="registration.CurrentSchool?.length > 0 ? 'is-valid' : ''" />
                </div>
            </div>
            <div v-if="school?.LineCourses?.length > 0"
                v-show="registration?.SchoolClass >= school?.MenuVisibleFromClass">
                <div class="form-group">
                    <label>Linjefag</label>
                    <select class="form-control" v-model="registration.LineCourse"
                        v-bind:class="!isLineCoursesValid() ? 'is-invalid' : 'is-valid'">
                        <option value="null">Ikke angivet</option>
                        <option v-for="course in school.LineCourses" v-bind:key="course" v-bind:value="course">
                            {{ course }}</option>
                    </select>
                    <p v-if="!isLineCoursesValid()">
                        <label class="text-danger">* Angiv &oslash;nsket linjefag</label>
                    </p>
                </div>
            </div>
            <div>
                <label class="control-label">Vedh&aelig;ft filer</label>
                <!-- <fileList :files="registration?.Files" @updateFileList="addFile" @deleteFile="removeFile"
                    @fileError="uploadError" />
                <p v-if="!isFileUploadValid()">
                    <br />
                    <label class="text-danger">* Den maksimale filuploadstørrelse er 15mb</label>
                </p> -->
            </div>
        </div>
        <div v-if="school?.KindergartenText" class="row well">
            <h2>{{ school?.KindergartenText }}:</h2>
            <div class="row">
                <div class="col-md-12">
                    <label>
                        <input type="checkbox" v-model="useKindergarten" v-on:change="toggleKindergarten()" />
                        &nbsp;
                        Tilmeld
                    </label>
                </div>
                <div v-if="useKindergarten" class="col-md-6">
                    <label>&Oslash;nsket &aring;r for start i b&oslash;rnehaven</label>
                    <select class="form-control" v-model="registration.Kindergarten.KindergartenYear"
                        v-bind:class="!isKindergartenValid() ? 'is-invalid' : 'is-valid'">
                        <option value="null">V&aelig;lg &aring;r</option>
                        <option v-for="year in yearList" v-bind:key="year" v-bind:value="year">{{ year }}</option>
                    </select>
                    <p v-if="!isKindergartenValid()">
                        <label class="text-danger">* &Aring;r og m&aring;ned for b&oslash;rnehave skal udfyldes </label>
                    </p>
                </div>
                <div v-if="useKindergarten" class="col-md-6">
                    <label>&Oslash;nsket startm&aring;ned i b&oslash;rnehaven</label>
                    <select class="form-control" v-model="registration.Kindergarten.KindergartenMonth"
                        v-bind:class="!isKindergartenValid() ? 'is-invalid' : 'is-valid'">
                        <option value="null">V&aelig;lg m&aring;ned</option>
                        <option v-for="index in 12" :key="index" v-bind:value="getMonth(index)">{{ getMonth(index) }}
                        </option>
                    </select>
                    <p v-if="!isKindergartenValid()">
                        <label class="text-danger">* &Aring;r og m&aring;ned for b&oslash;rnehave skal udfyldes </label>
                    </p>
                </div>
            </div>
        </div>
        <div class="row well">
            <h2>S&oslash;skende:</h2>
            <p v-if="!((siblings?.length + registration?.Siblings?.length) > 0)" class="fw-bold">Der er blev ikke fundet
                s&oslash;skende p&aring; adressen.</p>
            <div v-if="((siblings?.length + registration?.Siblings?.length) > 0)">
                <label>
                    <input type="checkbox" v-model="displaySiblings" v-on:change="() => toggleSiblings()" />
                    &nbsp;
                    Har s&oslash;skende p&aring; skolen eller p&aring; ventelisten
                </label>
                <br />
                <div v-show="displaySiblings" class="form-group">
                    <label>V&aelig;lg s&oslash;skende:</label>
                    <select class="form-control" v-model="selectedSibling">
                        <option value=null>V&aelig;lg s&oslash;skende</option>
                        <option v-for="sibling in siblings" v-bind:key="sibling.Name" v-bind:value="sibling.Name">
                            {{ sibling.Name }}</option>
                    </select>
                    <ul class="list-group mt-1">
                        <li v-for="sibling in registration.Siblings" v-bind:key="sibling"
                            class="list-group-item d-flex justify-content-between align-items-center">
                            <span>{{ sibling }}</span>
                            <button type='button' class='btn btn-sm btn-danger'
                                @click="() => alterSiblings(sibling)">Fjern</button>
                        </li>
                    </ul>
                    <button class="btn btn-sm btn-success btnFixed mt-1" type="button"
                        v-bind:disabled="selectedSibling == null"
                        @click="() => alterSiblings(selectedSibling)">Tilf&oslash;j</button>
                </div>
            </div>
        </div>
        <div v-show="school.SpecialFields?.length > 0" class="row well">
            <h2>Ekstra oplysninger:</h2>
            <div v-for="specialField in school.SpecialFields">
                <label>
                    <input type="checkbox" v-model="specialField.Selected" v-on:change="() => setSpecialFields()" />
                    &nbsp;
                    {{ specialField.Name }}
                </label>
                <br />
            </div>
        </div>
        <div class="position-fixed top-0 end-0 p-3 z-1">
            <div class="toast bg-danger" v-bind:class="showToast ? 'show' : 'hide'">
                <div class="toast-header">
                    <h4 class="me-auto">{{ toastSubject }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body p-3">
                    <p class="text-white">{{ toastBody }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
