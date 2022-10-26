<script setup>
defineProps({
    answer: {
        type: Object,
        required: true,
    },

});
</script>

<template>
    <div class="answer">
        <h4>{{answer.user.username}}</h4>
        <p>{{answer.answer}}</p>
    </div>
</template>

<style scoped>
.answer {
    background: white;
    color: black;
    padding: 1rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
}
</style>