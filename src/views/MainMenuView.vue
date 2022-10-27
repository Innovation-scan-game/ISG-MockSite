<script setup>
import Logo from '../components/Logo.vue';
import BackButton from '../components/BackButton.vue';
import GameButton from '../components/GameButton.vue';
import { useStore } from '../stores/new'
import { http } from '../http.js';
import { useSignalR } from '@dreamonkey/vue-signalr';

const store = useStore();

function join() {

    console.log("JOIN GAEM")
    store.setGameState('join')
}
function logOut() {
    store.logOut();
    store.setGameState('default');
    store.getConnection.stop();
}

async function host() {
    await http.post("/api/session/create").then((response) => {
        console.log("response", response)
        store.setSession(response.data)
        store.setGameState('lobby')
        console.log("host conid", store.connectionId)
        http.post("/api/joingrp", { connectionId: store.connectionId })
    })
}
</script>

<template>
    <div class="menu">
        <!-- <h1>main menu</h1> -->
        <!-- <BackButton goto="default" /> -->
        <Logo />
        <form action="">
            <div class="buttons">

                <GameButton @click.prevent="join" text="Join a game" icon="heroicons:users-solid" />
                <GameButton @click.prevent="host" text="Host a game" icon="fa-solid:crown" />
                <GameButton @click.prevent="store.setGameState('howto')" text="How-to-play"
                    icon="fa-solid:question-circle" />

            </div>
            <div class="buttons">
                <GameButton @click.prevent="store.setGameState('settings')" text="Settings" icon="eva:settings-fill" />
                <GameButton class="red" @click.prevent="logOut" text="Logoff" icon="bi:arrow-left-circle-fill" />

            </div>
        </form>
    </div>
</template>

<style scoped>
.buttons {
    margin-top: 3rem;
}

header {
    margin-top: 5rem;
}
</style>