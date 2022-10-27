<script setup>
import { ref } from 'vue';
const emit = defineEmits(["answer"]);

const selectedAnswer = ref("");

function buttonClick(answer) {
    selectedAnswer.value = answer;
    emit("answer", answer);
}

</script>

<template>
    <div class="multiplechoice">
        <button :class="{ selected: selectedAnswer == 'A' }" @click="buttonClick('A')">A</button>
        <button :class="{ selected: selectedAnswer == 'B' }" @click="buttonClick('B')">B</button>
        <button :class="{ selected: selectedAnswer == 'C' }" @click="buttonClick('C')">C</button>
        <button :class="{ selected: selectedAnswer == 'D' }" @click="buttonClick('D')">D</button>
    </div>
</template>

<style scoped>
.selected {
    border: 4px solid black;
}

.multiplechoice {
    margin: 0 auto;
    margin-top: 2rem;

    max-width: 500px;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    flex-wrap: wrap;
}

button {
    box-sizing: border-box;

    width: calc(50% - 3rem);
    height: auto;
    flex-grow: 1;
    flex-shrink: 1;
    aspect-ratio: 1 / 1;
    font-size: 5rem;
    font-weight: bold;
    color: white;
    border: 4px solid transparent;
    border-radius: 20px;
}

button:nth-of-type(1) {
    background: #4882B7;
}

button:nth-of-type(2) {
    background: #48B76E;
}

button:nth-of-type(3) {
    background: #DBC926;
}

button:nth-of-type(4) {
    background: #B74848;
}

button:hover {
    opacity: .8;
}
</style>