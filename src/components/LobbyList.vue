<script setup>
import LobbyListElement from './LobbyListElement.vue';
defineProps({
    players: {
        type: Array,
        required: false,
    },

});
// const players = [{username: "jurek"}, {username: "jurek2"}]

</script>

<template>
    <div class="playerList">
        <h4>Players</h4>
        <hr>
        <LobbyListElement v-for="player in players" :player="player" />
    </div>
</template>

<style scoped>
.playerList {
    background-color: white;
    border-radius: 1rem;
    color: black;
    padding: 1.5rem 2rem;
    overflow: hidden;
}
hr {
    margin-bottom: 1rem;
}
</style>