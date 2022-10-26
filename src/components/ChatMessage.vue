<script setup>
import { computed } from 'vue'
import { useStore } from '../stores/new'
const store = useStore();
const props = defineProps({
    message: {
        type: Object,
        required: true,
    },
});
const isMyMessage = computed(() => {
    return props.message.user.id === store.user.id;
});
</script>
<template>
    <div class="message_container" :class="isMyMessage ? 'left' : 'right'">
        <p class="message" :class="isMyMessage ? 'send' : 'received'">{{message.message}}</p>
        <p v-if="!isMyMessage">{{message.user.username}}</p>
    
    </div>
</template>

<style scoped>
.message_container {
    display: flex;
    align-items: flex-end;
    max-width: 75%;
}

.message_container p {
    z-index: 2;
    margin-left: .5rem;
    margin-top: .5rem;
}

.left {
    align-self: flex-start;

}

.right {
    align-self: flex-end;
    margin-right: 1rem;
}

.message {
    display: inline-block;
    margin: 0.25em;
    min-height: 1em;
    padding: 0.25em 0.75em;
    position: relative;
    border-radius: 0.65em;
    line-height: 1.5;
    font-size: 1.25rem;
}

.send {
    color: black;
    background-color: #ebebeb;
}

.received {
    color: white;
    background-color: dodgerblue;
    margin-right: 1rem;
}

.received::before {
    content: "";
    display: block;
    width: 1.5em;
    height: 1em;
    position: absolute;
    right: -.7em;
    bottom: 0;
    border-left: 0.75em solid dodgerblue;
    border-bottom-left-radius: 100%;
    /* z-index: -1; */
}
</style>