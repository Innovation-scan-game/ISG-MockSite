<script setup>
import { defineAsyncComponent } from 'vue'
import GameButton from '../components/GameButton.vue';
import { useStore } from '../stores/new'
import Logo from '../components/Logo.vue';
const store = useStore();

function exit() {
    window.close()
}

</script>


<template>
    <div class="startview">
        <Logo></Logo>
        <div class="buttons">

            <GameButton @click.prevent="store.setGameState('login')" text="Login and play" icon="fa-solid:user-lock" />
            
            <GameButton @click.prevent="store.setGameState('register')" text="Register now" icon="icomoon-free:user-plus" />
            <GameButton class="red" style="width: max-content; align-self: flex-end; margin-top: 3rem;" @click.prevent="exit" text="Exit" icon="el:circle-arrow-left" />

        </div>
    </div>
</template>

<style scoped>
header {
    margin-top: 5rem;
    margin-bottom: 0;
}
.start_screen {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.start_screen .buttons {
    gap: 1.5rem;
    flex-grow: 1;
    width: unset;
    flex-wrap: nowrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: flex-end;
}

.start_screen .buttons button:last-child {
    margin-top: 4rem;
    width: fit-content;
    align-self: flex-end;

}
</style>