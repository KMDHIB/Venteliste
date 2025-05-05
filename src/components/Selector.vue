<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
    choices: Array
})

const emit = defineEmits(['newSelected'])

const currentIndex = ref(0);

const changeStep = (step) => {
    emit('goToStep', step)
}

const select = (index) => {
    for (let i = 0; i < this.choices?.length; i++) {
        if (i === index) {
            choices[i].Selected = true;
            if (currentIndex !== index) {
                currentIndex = index;
                $emit("newSelected", index);
            }
        } else {
            choices[i].Selected = false;
        }
    }
};
</script>

<template>
    <div class="well row">
        <div class="col-sm-12 form-group">
            <h2>V&aelig;lg barn:</h2>
            <h4>B&oslash;rn, der kan tilmeldes:</h4>
            <div class="list-group">
                <a v-for="(choice, index) in choices" v-bind:key="choice.Name"
                    class="list-group-item barnitem cursorPointer" v-bind:class="choice?.Selected ? 'active' : ''"
                    v-on:click="() => select(index)">
                    <div>{{ choice.Name }}</div>
                    <small>{{ choice.Status }}</small>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
