<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    subText: {
        type: String,
        required: false,
    },
    icon: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <div class="headline">
        <div class="title">
            <Icon class="icon" :icon="icon" />
            <h3>{{ text }}</h3>
        </div>
        <p v-if="subText !== null">{{subText}}</p>
    </div>
</template>

<style scoped>
h3 {
    font-size: 1.75rem;
}

.icon {
    min-width: 2rem;
    min-height: 2rem;
    width: 2rem;
    height: 2rem;
}

.title {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 80%;
    margin-bottom: .25rem;
}

.headline p {
    max-width: 80%;
    margin-bottom: .5rem;
}
</style>