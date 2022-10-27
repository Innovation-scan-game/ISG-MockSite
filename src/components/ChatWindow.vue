<script setup>
import { storeToRefs } from "pinia";

import ChatMessage from "./ChatMessage.vue";
import GameButton from "./GameButton.vue";
// defineProps({
//     messages: {
//         type: Array,
//         required: true,
//     },
import { useStore } from '../stores/new'
import { nextTick, ref, watch, onMounted } from 'vue'
import { http } from "../http";
const store = useStore();
const { messages } = storeToRefs(store);
// });
const messageInput = ref("");
const messageContainer = ref(null);

async function sendMessage() {
    await http.post("/api/session/message", { message: messageInput.value }).then(() => {
        messageInput.value = "";
    })
}
async function nextRound() {

    await http.post("/api/session/next", { Conclusion: store.conclusion })
}

async function endGame() {
    await http.post("/api/session/end", { Conclusion: store.conclusion })
}

function scrollDown(behavior) {
    const mContainer = messageContainer.value;
    if (mContainer && mContainer.children.length > 0) {
        mContainer.children[mContainer.children.length - 1].scrollIntoView({ behavior: behavior });
    }
}

watch(() => store.messages, async () => {
    await nextTick();
    scrollDown('smooth');
}, { deep: true });

onMounted(() => {
    scrollDown('auto');
})
</script>

<template>
    <h4>Discussion</h4>

    <div class="chat" ref="messageContainer" v-auto-animate>
        <ChatMessage v-for="message in store.getCurrentMessages" :message="message" />

    </div>
    <div class="hostButtons" v-if="store.isHost">

        <GameButton class="left" text="Add conclusion" @click="store.setGameState('addConclusion')"
            icon="carbon:result-new" />

        <GameButton v-if="store.gameInfo.currentRound < store.gameInfo.rounds - 1" class="green" text="Next round"
            icon="carbon:next-filled" @click.prevent="nextRound" />

        <GameButton v-else="" class="green" text="End game" icon="icons8:finish-flag" @click="endGame" />

    </div>

    <div class="inputs">
        <input placeholder="Message" v-model="messageInput" type="text">
        <GameButton :disabled="messageInput === ''" text="Send" @click="sendMessage" />
    </div>
</template>

<style scoped>
button.green {
    align-self: flex-end;
    width: max-content;
    margin-bottom: 1rem;
}

.chat {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    /* margin-left: 4rem;
    margin-right: 4rem;
    margin-top: 1rem; */
    margin: 1rem 4rem;
    aspect-ratio: 2/1;
    flex-grow: 1;
    overflow-y: scroll;
    overflow-x: hidden;
}

h4 {
    margin-left: 4rem;
    margin-right: 4rem;
    /* margin-top: 1rem; */
}

.inputs {
    display: flex;
    align-items: center;
    background: #ACACAC;
    padding: 1rem 0;
    gap: 1rem;
}

.inputs>input {
    flex-grow: 1;
    margin-left: 4rem;
}

.chat::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.chat {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.hostButtons {
    display: flex;
    justify-content: space-between;
}
</style>