<script setup>
import { ref } from 'vue';
import IconHeadline from '../components/IconHeadline.vue';
import BackButton from '../components/BackButton.vue';
import UserAccount from '../components/UserAccount.vue';
import GameButton from '../components/GameButton.vue';
import { useStore } from '../stores/new'
import Modal from '../components/Modal.vue';
import { http } from '../http';
const store = useStore();
const modalOpen = ref(false);

async function deleteProfile() {
    await http.delete("/api/user/" + store.user.id).then((response) => {
        store.resetState();
        store.logOut();
        // store.setUser(null);
        // store.setToken(null);
        // store.setLoggedIn(false);
    }).catch((error) => {
        console.log("errrrr", error.response)
    })
}

async function confirmModal() {
    modalOpen.value = false;
    await deleteProfile();
    console.log("CONFFFFFF")
}
function closeModal() {
    modalOpen.value = false;
}

function confirmDelete() {
    console.log("delete profile")
    modalOpen.value = true;
}

</script>

<template>
    <div class="settings">
        <BackButton goto="menu" />
        <Modal :isOpen="modalOpen" @confirm="confirmModal" @close="closeModal" body="Confirm to del"
            text="Delete account" />
        <form @submit.prevent="store.setGameState('editProfile')">

            <IconHeadline text="Account settings" icon="fa-solid:user-cog" />
            <UserAccount :user="store.user" />

            <div class="buttons">
                <GameButton text="Edit profile" icon="fa6-solid:user-pen" />
                <!-- <GameButton text="Change password" icon="fa-solid:user-lock" /> -->
            </div>
            <GameButton class="red" @click.prevent="confirmDelete" text="Delete profile" icon="fa6-solid:trash-can" />

        </form>
    </div>
</template>