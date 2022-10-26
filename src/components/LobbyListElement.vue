<script setup>
import { useStore } from '../stores/new';
const store = useStore();

defineProps({
    player: {
        type: Object,
        required: true,
    },

});
</script>

<template>
    <div class="player">
        <div class="name">

            <div class="playerIcon">
                <Icon v-if="player.id === store.sessionInfo.hostId" class="crown" icon="fa-solid:crown" />

                <div v-if="player.picture" class="icon" :style="'background-image: url(' + player.picture + ')'">
                </div>


                <div v-else class="icon">
                    <Icon icon="bi:person-fill" style="color: white" />

                </div>
            </div>
            <p>{{ player.username }}</p>
        </div>

        <!-- <p>{{ player.ready ? 'ready' : 'not ready' }}</p> -->
        <Icon style="font-size:2rem;" :style="player.ready ? 'color: #45B171' : 'color: #EF5959'"
            :icon="player.ready ? 'fluent:checkmark-circle-12-filled' : 'akar-icons:circle-x-fill'" />
    </div>
</template>

<style scoped>
/* .playerIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
} */
.crown {
    color: gold;
    position: absolute;
    top: -.75rem;
    left: .25rem;
    z-index: 2;
}

.icon {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #FFC107;
    background-size: contain;
    background-position: center;
    /* margin-right: 1rem; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon svg {
    width: 75%;
    height: 75%;
}

.player {
    display: flex;
    gap: .75rem;
    align-items: center;
    margin: 1rem 0;
    justify-content: space-between;
}

.name {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    gap: .5rem;
}
</style>