<script setup>
import { ref, watch } from 'vue';
import BackButton from '../components/BackButton.vue';
import IconHeadline from '../components/IconHeadline.vue';
import GameButton from '../components/GameButton.vue';
import { http } from '../http';
import { useStore } from '../stores/new'
const store = useStore();
const lobbyId = ref("");
const feedback = ref("");
async function joinGame() {
    console.log("JOIN GAEM")

    await http.post("/api/session/join", {sessionAuth: lobbyId.value}).then((response) => {
        console.log("response", response)
        store.setSession(response.data)
        store.setGameState('lobby')
        console.log("host conid", store.connectionId)
        http.post("/api/joingrp", { connectionId: store.connectionId })
    }).catch((error) => {
        console.log("error", error)
        feedback.value = error.response.data.message
    })
}
watch(() => lobbyId.value, (val) => {
    feedback.value = ""
})
</script>

<template>
    <div class="join">
        <BackButton goto="menu" />
        <form @submit.prevent="joinGame">
            <IconHeadline text="Join a game" icon="heroicons:users-solid"
                sub-text="Join a game by entering the Game ID you received from the game host." />
            <label>Enter Game ID
                <input type="text" v-model="lobbyId" maxlength="4" name="" id="">
            </label>
            <p v-if="feedback !== ''" class="error">{{feedback}}</p>

            <GameButton class="green" text="Join" icon="fluent-mdl2:join-online-meeting" />
        
        </form>
    </div>
</template>
<style scoped>
form button {
    margin-top: 2rem;
}
</style>