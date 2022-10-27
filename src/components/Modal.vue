<script setup>
import { ref, watch } from 'vue';
import GameButton from './GameButton.vue';
import IconHeadline from './IconHeadline.vue';
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    isOpen: {
        type: Boolean,
        defaul: false
    }
});
const modalOpen = ref(false);

watch(() => props.isOpen, (open) => {
    modalOpen.value = open;
});

const emit = defineEmits(['close', 'confirm']);


function close() {
    emit('close');
}
function confirm() {
    emit('confirm');
}

</script>

<template>
    <Teleport to="body">
        <div class="root" v-auto-animate v-if="modalOpen">
            <div class="modal">
                <IconHeadline :text="text" icon="fa-solid:exclamation-triangle" />
                <p>{{body}}</p>
                <div class="btns">
                    <GameButton text="close" class="red left" @click="close" />
                    <GameButton text="Confirm" class="green" @click="confirm" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.headline,
p {
    padding-left: 2rem;
}

.headline {
    padding-top: 2rem;

}

.btns {
    display: flex;
    margin-top: 1rem;
    justify-content: space-between;
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .4);
    backdrop-filter: blur(12px);
}

.modal {
    /* margin-left: auto;
    margin-right: auto;
    top: 33%;
    left: 0;
    right: 0; */
    margin: 0 auto;
    top: 25%;
    width: 75%;
    min-width: 340px;
    max-width: 600px;
    /* text-align: center; */
    background: white;
    /* padding: 2rem; */
    border-radius: 18px;
}
</style>