<script setup>
import BackButton from '../components/BackButton.vue';
import IconHeadline from '../components/IconHeadline.vue';
import LobbyList from '../components/LobbyList.vue';
import GameButton from '../components/GameButton.vue';
import { useStore } from '../stores/new'
import { http } from '../http';
const store = useStore();

let isReady = false;


async function changeReadiness() {
    console.log("change readiness")
    isReady = !isReady;
    await http.post("/api/session/ready", { ready: isReady })
}
async function onBack() {
    console.log("pressed back, leave session")
    await http.post("/api/session/leave", {})
    store.setSession({});
}

async function startGame() {
    console.log("start game")
    await http.post("/api/session/start", {rounds: 3, roundDuration: 120})
}
</script>
<template>

    <div class="lobby">

        <BackButton goto="menu" @click="onBack" />
        <form>
            <IconHeadline :text="'Game lobby #' + store.sessionInfo.sessionCode" icon="heroicons:users-solid" />
            <LobbyList :players="store.sessionInfo.players" />
            <GameButton @click.prevent="changeReadiness" class="green" text="Ready up" icon="fa-solid:check-circle" />
            
            <GameButton v-if="store.isHost" text="Start game" @click.prevent="startGame" icon="fa-solid:play" />
        </form>
    </div>

</template>
<style scoped>
form button {
    margin-top: 3rem;
}
</style>