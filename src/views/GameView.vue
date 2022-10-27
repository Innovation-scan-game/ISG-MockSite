<script setup>
import IconHeadline from '../components/IconHeadline.vue';
import GameQuestion from '../components/GameQuestion.vue';
import GameButton from '../components/GameButton.vue';
import ChatWindow from '../components/ChatWindow.vue';
import { useStore } from '../stores/new'
import Answer from '../components/Answer.vue';
import { http } from '../http';
import { ref } from 'vue'
const store = useStore();

const answerText = ref("");

async function submitAnswer() {
    await http.post("/api/session/submit", { answer: answerText.value }).then(() => {
        store.setAnswerSubmitted(true)
        answerText.value = "";
    })
}
function onAnswer(answer) {
    answerText.value = answer;
}
</script>

<template>
    <div class="game">
        <IconHeadline :text="store.answerSubmitted ? 'Chat room' : 'Question room'"
            icon="heroicons:question-mark-circle-solid" />

        <div class="infos">
            <p>Round {{ store.gameInfo.currentRound + 1 }}/{{ store.gameInfo.rounds }}</p>
            <p>{{ store.sessionInfo.players.length }} Players</p>
        </div>

        <div class="top">

            <h3>Question #{{ store.gameInfo.currentRound + 1 }}</h3>
            <GameQuestion :card="store.getCurrentCard" @answer="onAnswer" />

            <form v-if="store.answerSubmitted === false">
                <!-- v-if="store.getCurrentCard.type !== 2"  -->
                <textarea v-if="store.getCurrentCard.type !== 2" v-model="answerText"
                    placeholder="Your answer"></textarea>
                <!-- <input type="text" name="" id=""> -->
                <GameButton :disabled="answerText === ''" class="green" @click.prevent="submitAnswer" text="Submit answer"
                    icon="fa-solid:check-circle" />
            </form>
            <div v-else v-auto-animate>
                <Answer v-for="answer in store.answers" :answer="answer" :key="answer.id" />
            </div>
        </div>
        <ChatWindow v-if="store.answerSubmitted === true" />
        <!-- </section> -->
    </div>
</template>

<style scoped>
section {
    margin-top: 1rem;
    /* flex-grow: 1; */
}

form {
    flex-grow: .33;
    margin-bottom: 2rem;
}

textarea {
    min-height: 4rem;
    margin-top: 1rem;
    resize: none;
    flex-grow: 1;
    margin: 0;
}

.game {
    margin-top: 3rem;
    /* gap: 1rem */
}

.infos {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.card {
    flex-grow: 1;
}

.game>div {
    margin-left: 4rem;
    margin-right: 4rem;
}

.top form {
    margin: 0;
}

.top form button {
    margin-bottom: 2rem;
    margin-right: -4rem;
}

.top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* max-height: 50vh; */
    /* overflow-y: scroll; */
    flex-grow: 1;

}
</style>