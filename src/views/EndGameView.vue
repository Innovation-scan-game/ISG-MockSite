<script setup>
import IconHeadline from '../components/IconHeadline.vue';
import BackButton from '../components/BackButton.vue';
import { onMounted, nextTick } from 'vue';
import ConfettiExplosion from "vue-confetti-explosion";

</script>

<template>
    <div class="endgame">
        <BackButton goto="menu" />
        <IconHeadline text="Thanks for playing" icon="fa-solid:trophy" />
        <ConfettiExplosion :stageHeight="1200" :particleSize="16" :particleCount="350" :duration="4500" :colors="['#6DB3E7', '#6fad51', '#DD4C4C', '#C96E1B']" />

    </div>
</template>

<style scoped>
.headline {
    margin-left: 4rem;
    margin-right: 4rem;
}

.endgame {
    overflow: hidden;
}
</style>