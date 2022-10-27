<script setup>
import { useStore } from '../stores/new'

defineProps({
    goto: {
        type: String,
        required: true,
    },
});
const store = useStore();

</script>

<template>
    <button @click="store.setGameState(goto)">
        <Icon icon="eva:arrow-ios-back-fill" style="font-size:2.25rem;" />
        Back
    </button>
</template>

<style scoped>
button {
    color: #3990F5;
    width: max-content;
    border-radius: 0 2rem 2rem 0;
    padding: .85rem 2rem;
    margin-top: 8vh;
    margin-bottom: 8vh;
    border: 0;
    display: flex;
    align-items: center;
    font-size: 1.25rem;
}
</style>