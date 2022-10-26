<script setup>
import BackButton from '../components/BackButton.vue';
import IconHeadline from '../components/IconHeadline.vue';
import GameButton from '../components/GameButton.vue';
import { useStore } from '../stores/new'
const store = useStore();
async function setConclusion() {
    console.log("set conclusion")
    store.setGameState("game")
}

</script>
<template>
    <div class="conclusion">
        <BackButton goto="game" />
        <form @submit.prevent="setConclusion">

            <IconHeadline text="Conclusion" icon="fa-solid:trophy"
                subText="Enter a conclussion to the discussion in the textfield bellow. Then continue the game." />
            <textarea v-model="store.conclusion"></textarea>
            <GameButton text="Submit" icon="fa-solid:check" />
        </form>
    </div>
</template>

<style scoped>
textarea {
    resize: false;
    min-height: 20vh;
}
</style>