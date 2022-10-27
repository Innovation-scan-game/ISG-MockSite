<script setup>
import MultipleChoiceButtons from './MultipleChoiceButtons.vue';

import { useStore } from '../stores/new'

const store = useStore();
defineProps({
    card: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['answer']);

function onAnswer(answer) {
    emit('answer', answer);
}

</script>

<template>
    <div class="card">
        <h3></h3>
        <h4>{{ card.cardName }}</h4>
        <pre><p>{{ card.cardBody }}</p></pre>
        <img v-if="store.answerSubmitted == false && card.cardName == 'A question with an image'" class="cardImage"
            src="https://i.imgur.com/ZBrrkx9.png" />

        <MultipleChoiceButtons @answer="onAnswer" v-if="store.answerSubmitted == false && card.type === 2" />
    </div>
</template>
<style scoped>
.card {
    background: white;
    color: black;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;

}

.cardImage {
    max-width: 100%;
    align-self: center;
}
</style>